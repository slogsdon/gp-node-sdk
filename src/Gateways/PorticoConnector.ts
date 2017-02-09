import {
  CData as cData,
  Element,
  Element as element,
  ElementTree,
  SubElement as subElement,
  XML as xml,
} from "@derflatulator/elementtree";

import {
  AccountType,
  AliasAction,
  AuthorizationBuilder,
  BaseBuilder,
  CheckType,
  CreditCardData,
  CreditTrackData,
  DebitTrackData,
  EBTCardData,
  EBTTrackData,
  ECheck,
  EntryMethod,
  GatewayError,
  GiftCard,
  IBalanceable,
  ICardData,
  IEncryptable,
  InquiryType,
  IPaymentMethod,
  IPinProtected,
  ITokenizable,
  ITrackData,
  ManagementBuilder,
  NotImplementedError,
  PaymentMethodType,
  SecCode,
  TaxType,
  Transaction,
  TransactionModifier,
  TransactionReference,
  TransactionType,
  UnsupportedTransactionError,
} from "../";
import {
  XmlGateway,
} from "./XmlGateway";

export class PorticoConnector extends XmlGateway {
  protected static XmlNamespace = "http://Hps.Exchange.PosGateway";
  public siteId: string;
  public licenseId: string;
  public deviceId: string;
  public username: string;
  public password: string;
  public secretApiKey: string;
  public developerId: string;
  public versionNumber: string;

  public processAuthorization(builder: AuthorizationBuilder): Promise<Transaction> {
    // build request
    const transaction = element(this.mapRequestType(builder));
    // const transaction = Element(builder.transactionType);
    const block1 = subElement(transaction, "Block1");

    if (builder.paymentMethod.paymentMethodType !== PaymentMethodType.Gift
      && builder.paymentMethod.paymentMethodType !== PaymentMethodType.ACH
      && (builder.transactionType === TransactionType.Auth
        || builder.transactionType === TransactionType.Sale)
    ) {
      subElement(block1, "AllowDup").append(cData(builder.allowDuplicates ? "Y" : "N"));

      if (builder.transactionModifier === TransactionModifier.None
        && builder.paymentMethod.paymentMethodType !== PaymentMethodType.EBT
      ) {
        subElement(block1, "AllowPartialAuth").append(cData(builder.allowPartialAuth ? "Y" : "N"));
      }
    }

    if (builder.amount) {
      subElement(block1, "Amt").append(cData(builder.amount.toString()));
    }

    if (builder.currency && builder.paymentMethod.paymentMethodType === PaymentMethodType.Gift) {
      subElement(block1, "Currency").append(cData(builder.currency.toUpperCase()));
    }

    if (builder.gratuity) {
      subElement(block1, "GratuityAmtInfo").append(cData(builder.gratuity));
    }

    if (builder.cashBackAmount) {
      subElement(
        block1,
        builder.paymentMethod.paymentMethodType === PaymentMethodType.Debit
          ? "CashbackAmtInfo"
          : "CashBackAmount",
      )
        .append(cData(builder.cashBackAmount.toString()));
    }

    if (builder.offlineAuthCode) {
      subElement(block1, "OfflineAuthCode").append(cData(builder.offlineAuthCode));
    }

    if (builder.transactionType === TransactionType.Alias) {
      let action: string;
      switch (builder.aliasAction) {
        case AliasAction.Add:
          action = "ADD";
          break;
        case AliasAction.Create:
          action = "CREATE";
          break;
        case AliasAction.Delete:
          action = "DELETE";
          break;
        default:
          action = "";
      }

      subElement(block1, "Action").append(cData(action));
      subElement(block1, "Alias").append(cData(builder.alias));
    }

    const isCheck = builder.paymentMethod.paymentMethodType === PaymentMethodType.ACH;
    if (isCheck || builder.address) {
      const address = this.hydrateHolder(builder, isCheck);
      if (address && address.getchildren().length > 0) {
        block1.append(address);
      }
    }

    const { hasToken, tokenValue } = this.hasToken(builder.paymentMethod);

    // card data
    const cardData = new Element(
      builder.transactionType === TransactionType.Replace
        ? "OldCardData" : "CardData",
    );
    if (builder.paymentMethod instanceof GiftCard) {
      if (builder.transactionType === TransactionType.Replace) {
        const newCard = subElement(block1, "NewCardData");
        subElement(newCard, builder.replacementCard.valueType)
          .append(cData(builder.replacementCard.value));

        if (builder.replacementCard.pin) {
          subElement(newCard, "PIN").append(cData(builder.replacementCard.pin));
        }
      }

      if (builder.paymentMethod.value) {
        subElement(cardData, builder.paymentMethod.valueType)
          .append(cData(builder.paymentMethod.value));
      }

      if (builder.paymentMethod.pin) {
        subElement(cardData, "PIN").append(cData(builder.paymentMethod.pin));
      }
    } else if (((builder.paymentMethod as Object) as ICardData).number !== undefined) {
      cardData.append(this.hydrateManualEntry(builder, hasToken, tokenValue));
    } else if (((builder.paymentMethod as Object) as ITrackData).value !== undefined) {
      const trackData = this.hydrateTrackData(builder, hasToken, tokenValue);

      if (builder.paymentMethod.paymentMethodType === PaymentMethodType.Debit) {
        block1.append(trackData);
      } else {
        cardData.append(trackData);
      }
    } else if (builder.paymentMethod instanceof ECheck) {
      subElement(block1, "CheckAction").append(cData("SALE"));

      if (hasToken) {
        subElement(block1, "TokenValue").append(cData(tokenValue));
      } else {
        const accountInfo = subElement(block1, "AccountInfo");
        subElement(accountInfo, "RoutingNumber")
          .append(cData(builder.paymentMethod.routingNumber));
        subElement(accountInfo, "AccountNumber")
          .append(cData(builder.paymentMethod.accountNumber));
        subElement(accountInfo, "CheckNumber")
          .append(cData(builder.paymentMethod.checkNumber));
        subElement(accountInfo, "MICRData")
          .append(cData(builder.paymentMethod.micrNumber));
        subElement(accountInfo, "AccountType")
          .append(cData(
            this.hydrateAccountType(builder.paymentMethod.accountType),
          ));
      }

      subElement(block1, "DataEntryMode")
        .append(cData(
          this.hydrateEntryMethod(builder.paymentMethod.entryMode).toUpperCase(),
        ));

      subElement(block1, "CheckType")
        .append(cData(
          this.hydrateCheckType(builder.paymentMethod.checkType),
        ));

      subElement(block1, "SECCode")
        .append(cData(
          this.hydrateSecCode(builder.paymentMethod.secCode),
        ));

      const verifyInfo = subElement(block1, "VerifyInfo");
      subElement(verifyInfo, "CheckVerify")
        .append(cData(builder.paymentMethod.checkVerify ? "Y" : "N"));
      subElement(verifyInfo, "ACHVerify")
        .append(cData(builder.paymentMethod.achVerify ? "Y" : "N"));
    }

    if (((builder.paymentMethod as Object) as IPinProtected).pinBlock !== undefined) {
      const pinBlock = ((builder.paymentMethod as Object) as IPinProtected).pinBlock;
      subElement(block1, "PinBlock").append(cData(pinBlock));
    }

    if (((builder.paymentMethod as Object) as IEncryptable).encryptionData !== undefined) {
      const enc = this.hydrateEncryptionData(builder);

      if (builder.paymentMethod.paymentMethodType === PaymentMethodType.Debit) {
        block1.append(enc);
      } else {
        cardData.append(enc);
      }
    }

    if (((builder.paymentMethod as Object) as ITokenizable).tokenize !== undefined) {
      subElement(cardData, "TokenRequest")
        .append(cData(builder.requestMultiUseToken ? "Y" : "N"));
    }

    if (cardData.getchildren().length > 0 && builder.aliasAction !== AliasAction.Create) {
      block1.append(cardData);
    }

    if (((builder.paymentMethod as Object) as IBalanceable).balanceInquiry !== undefined
      && builder.balanceInquiryType
    ) {
      subElement(block1, "BalanceInquiryType")
        .append(cData(
          this.hydrateInquiryType(builder.balanceInquiryType),
        ));
    }

    // cpc request
    if (builder.level2Request === true) {
      subElement(block1, "CPCReq").append(cData("Y"));
    }

    // details
    if (builder.customerId || builder.description || builder.invoiceNumber) {
      const addons = subElement(block1, "AdditionalTxnFields");
      subElement(addons, "CustomerID").append(cData(builder.customerId));
      subElement(addons, "Description").append(cData(builder.description));
      subElement(addons, "InvoiceNbr").append(cData(builder.invoiceNumber));
    }

    if (builder.dynamicDescriptor) {
      subElement(block1, "TxnDescriptor").append(cData(builder.dynamicDescriptor));
    }

    return new Promise((resolve, reject) => {
      this.doTransaction(this.buildEnvelope(transaction))
        .then((response) => resolve(this.mapResponse(response, builder)))
        .catch(reject);
    });
  }

  public manageTransaction(builder: ManagementBuilder): Promise<Transaction> {
    // build request
    const transaction = element(this.mapRequestType(builder));

    if (builder.transactionType !== TransactionType.BatchClose) {
      let root: Element;
      if (builder.transactionType === TransactionType.Reversal
        || builder.transactionType === TransactionType.Refund
        || builder.paymentMethod.paymentMethodType === PaymentMethodType.Gift
        || builder.paymentMethod.paymentMethodType === PaymentMethodType.ACH
      ) {
        root = new Element("Block1");
      } else {
        root = transaction;
      }

      // transaction ID
      if (builder.paymentMethod) {
        const ref = builder.paymentMethod as TransactionReference;
        subElement(root, "GatewayTxnId").append(cData(ref.transactionId));
      }

      // level II Data
      if (builder.transactionType === TransactionType.Edit
        && builder.transactionModifier === TransactionModifier.LevelII) {
        const cpc = subElement(root, "CPCData");
        if (builder.poNumber) {
          subElement(cpc, "CardHolderPONbr").append(cData(builder.poNumber));
        }
        if (builder.taxType) {
          subElement(cpc, "TaxType")
            .append(cData(this.hydrateTaxType(builder.taxType)));
        }
        if (builder.taxAmount) {
          subElement(cpc, "TaxAmt").append(cData(builder.taxAmount.toString()));
        }
      } else {
        // amount
        if (builder.amount) {
          subElement(root, "Amt").append(cData(builder.amount.toString()));
        }

        // gratuity
        if (builder.gratuity) {
          subElement(root, "GratuityAmtInfo").append(cData(builder.gratuity));
        }
      }

      if (builder.transactionType === TransactionType.Reversal
        || builder.transactionType === TransactionType.Refund
        || builder.paymentMethod.paymentMethodType === PaymentMethodType.Gift
        || builder.paymentMethod.paymentMethodType === PaymentMethodType.ACH
      ) {
        transaction.append(root);
      }
    }

    return new Promise((resolve, reject) => {
      this.doTransaction(this.buildEnvelope(transaction))
        .then((response) => resolve(this.mapResponse(response, builder)))
        .catch(reject);
    });
  }

  protected buildEnvelope(transaction: Element): string {
    const envelope = element("soap:Envelope", {
      "xmlns:soap": "http://schemas.xmlsoap.org/soap/envelope/",
    });
    const body = subElement(envelope, "soap:Body");
    const request = subElement(body, "PosRequest", {xmlns: PorticoConnector.XmlNamespace});
    const version1 = subElement(request, "Ver1.0");

    // header
    const header = subElement(version1, "Header");
    if (this.secretApiKey) {
      subElement(header, "SecretAPIKey").append(cData(this.secretApiKey));
    }
    if (this.siteId) {
      subElement(header, "SiteId").append(cData(this.siteId));
    }
    if (this.licenseId) {
      subElement(header, "LicenseId").append(cData(this.licenseId));
    }
    if (this.deviceId) {
      subElement(header, "DeviceId").append(cData(this.deviceId));
    }
    if (this.username) {
      subElement(header, "UserName").append(cData(this.username));
    }
    if (this.password) {
      subElement(header, "Password").append(cData(this.password));
    }
    if (this.developerId) {
      subElement(header, "DeveloperID").append(cData(this.developerId));
    }
    if (this.versionNumber) {
      subElement(header, "VersionNumber").append(cData(this.versionNumber));
    }

    // transaction
    subElement(version1, "Transaction").append(transaction);
    return new ElementTree(envelope).write();
  }

  protected mapRequestType(builder: BaseBuilder): string {
    switch (builder.transactionType) {
      case TransactionType.BatchClose:
        return "BatchClose";
      case TransactionType.Decline:
        if (builder.paymentMethod.paymentMethodType === PaymentMethodType.Gift) {
          return "GiftCardDeactivate";
        } else if (builder.transactionModifier === TransactionModifier.ChipDecline) {
          return "ChipCardDecline";
        } else if (builder.transactionModifier === TransactionModifier.FraudDecline) {
          return "OverrideFraudDecline";
        }
        throw new NotImplementedError();
      case TransactionType.Verify:
        return "CreditAccountVerify";
      case TransactionType.Capture:
        return "CreditAddToBatch";
      case TransactionType.Auth:
        if (builder.paymentMethod.paymentMethodType === PaymentMethodType.Credit) {
          if (builder.transactionModifier === TransactionModifier.Additional) {
            return "CreditAdditionalAuth";
          } else if (builder.transactionModifier === TransactionModifier.Incremental) {
            return "CreditIncrementalAuth";
          } else if (builder.transactionModifier === TransactionModifier.Offline) {
            return "CreditOfflineAuth";
          }

          return "CreditAuth";
        } else if (builder.paymentMethod.paymentMethodType === PaymentMethodType.Recurring) {
          return "RecurringBillingAuth";
        }
        throw new UnsupportedTransactionError("Transaction not supported for this payment method.");
      case TransactionType.Sale:
        if (builder.paymentMethod.paymentMethodType === PaymentMethodType.Credit) {
          if (builder.transactionModifier === TransactionModifier.Offline) {
            return "CreditOfflineSale";
          } else {
            return "CreditSale";
          }
        } else if (builder.paymentMethod.paymentMethodType === PaymentMethodType.Debit) {
          return "DebitSale";
        } else if (builder.paymentMethod.paymentMethodType === PaymentMethodType.Cash) {
          return "CashSale";
        } else if (builder.paymentMethod.paymentMethodType === PaymentMethodType.ACH) {
          return "CheckSale";
        } else if (builder.paymentMethod.paymentMethodType === PaymentMethodType.EBT) {
          if (builder.transactionModifier === TransactionModifier.CashBack) {
            return "EBTCashBackPurchase";
          } else if (builder.transactionModifier === TransactionModifier.Voucher) {
            return "EBTVoucherPurchase";
          } else {
            return "EBTFSPurchase";
          }
        } else if (builder.paymentMethod.paymentMethodType === PaymentMethodType.Gift) {
          return "GiftCardSale";
        }
        throw new UnsupportedTransactionError("Transaction not supported for this payment method.");
      case TransactionType.Refund:
        if (builder.paymentMethod.paymentMethodType === PaymentMethodType.Credit) {
          return "CreditReturn";
        } else if (builder.paymentMethod.paymentMethodType === PaymentMethodType.Debit) {
          return "DebitReturn";
        } else if (builder.paymentMethod.paymentMethodType === PaymentMethodType.Cash) {
          return "CashReturn";
        } else if (builder.paymentMethod.paymentMethodType === PaymentMethodType.EBT) {
          return "EBTFSReturn";
        }
        throw new UnsupportedTransactionError("Transaction not supported for this payment method.");
      case TransactionType.Reversal:
        if (builder.paymentMethod.paymentMethodType === PaymentMethodType.Credit) {
          return "CreditReversal";
        } else if (builder.paymentMethod.paymentMethodType === PaymentMethodType.Debit) {
          return "DebitReversal";
        } else if (builder.paymentMethod.paymentMethodType === PaymentMethodType.Gift) {
          return "GiftCardReversal";
        }
        throw new UnsupportedTransactionError("Transaction not supported for this payment method.");
      case TransactionType.Edit:
        if (builder.transactionModifier === TransactionModifier.LevelII) {
          return "CreditCPCEdit";
        }
        return "CreditTxnEdit";
      case TransactionType.Void:
        if (builder.paymentMethod.paymentMethodType === PaymentMethodType.Credit) {
          return "CreditVoid";
        } else if (builder.paymentMethod.paymentMethodType === PaymentMethodType.ACH) {
          return "CheckVoid";
        } else if (builder.paymentMethod.paymentMethodType === PaymentMethodType.Gift) {
          return "GiftCardVoid";
        }
        throw new UnsupportedTransactionError("Transaction not supported for this payment method.");
      case TransactionType.AddValue:
        if (builder.paymentMethod.paymentMethodType === PaymentMethodType.Credit) {
          return "PrePaidAddValue";
        } else if (builder.paymentMethod.paymentMethodType === PaymentMethodType.Debit) {
          return "DebitAddValue";
        } else if (builder.paymentMethod.paymentMethodType === PaymentMethodType.Gift) {
          return "GiftCardAddValue";
        }
        throw new UnsupportedTransactionError("Transaction not supported for this payment method.");
      case TransactionType.Balance:
        if (builder.paymentMethod.paymentMethodType === PaymentMethodType.Credit) {
          return "PrePaidBalanceInquiry";
        } else if (builder.paymentMethod.paymentMethodType === PaymentMethodType.EBT) {
          return "EBTBalanceInquiry";
        } else if (builder.paymentMethod.paymentMethodType === PaymentMethodType.Gift) {
          return "GiftCardBalance";
        }
        throw new UnsupportedTransactionError("Transaction not supported for this payment method.");
      case TransactionType.Activate:
          return "GiftCardActivate";
      case TransactionType.Alias:
          return "GiftCardAlias";
      case TransactionType.Replace:
          return "GiftCardReplace";
      case TransactionType.Reward:
          return "GiftCardReward";
      default:
        break;
    }

    throw new UnsupportedTransactionError("Unknown transaction");
  }

  protected mapResponse(rawResponse: string, builder: BaseBuilder): Transaction {
    const result = new Transaction();

    // todo: handle non-200 responses

    const root = xml(rawResponse).find(".//PosResponse");
    const acceptedCodes = [ "00", "0", "85", "10" ];

    let gatewayRspCode = this.normalizeResponse(root.findtext(".//GatewayRspCode"));
    const gatewayRspText = root.findtext(".//GatewayRspMsg");

    if (acceptedCodes.indexOf(gatewayRspCode) === -1) {
      throw new GatewayError(`Unexpected Gateway Response: ${gatewayRspCode} - ${gatewayRspText}`);
    }

    if (["0", "85"].indexOf(gatewayRspCode) !== -1) {
      gatewayRspCode = "00";
    }

    const item = root.find(`.//${this.mapRequestType(builder)}`);

    result.responseCode = item && item.findtext(".//RspCode")
      ? this.normalizeResponse(item.findtext(".//RspCode"))
      : gatewayRspCode;
    result.responseMessage = item && item.findtext(".//RspText")
      ? item.findtext(".//RspText")
      : gatewayRspText;

    if (builder.paymentMethod) {
      result.transactionReference = new TransactionReference(root.findtext(".//GatewayTxnId"));
      result.transactionReference.paymentMethodType = builder.paymentMethod.paymentMethodType;
    }

    if (item && item.findtext(".//AuthCode")) {
      result.transactionReference = result.transactionReference || new TransactionReference();
      result.transactionReference.authCode = item.findtext(".//AuthCode");
    }

    if (item && item.findtext(".//CPCInd")) {
      result.transactionReference = result.transactionReference || new TransactionReference();
      result.commercialIndicator = item.findtext(".//CPCInd");
    }

    if (item && item.findtext(".//AuthAmt")) {
      result.authorizedAmount = item.findtext(".//AuthAmt");
    }

    if (root.find(".//TokenData") && root.find(".//TokenData").findtext(".//TokenValue")) {
      const tokenData = root.find(".//TokenData");
      result.token = tokenData.findtext(".//TokenValue");
    }

    if (item && item.findtext(".//BalanceAmt")) {
      result.balanceAmount = item.findtext(".//BalanceAmt");
    }

    if (item && item.findtext(".//PointsBalanceAmt")) {
      result.pointsBalanceAmount = item.findtext(".//PointsBalanceAmt");
    }

    if (item && item.find(".//CardData")) {
      const cardData = item.find(".//CardData");
      result.giftCard = new GiftCard();
      result.giftCard.number = cardData.findtext(".//CardNbr");
      result.giftCard.alias = cardData.findtext(".//Alias");
      result.giftCard.pin = cardData.findtext(".//PIN");
    }

    return result;
  }

  protected normalizeResponse(input: string) {
    if (["0", "85"].indexOf(input) !== -1) {
      input = "00";
    }

    return input;
  }

  protected hasToken(paymentMethod: IPaymentMethod) {
    const tokenizable = (paymentMethod as Object) as ITokenizable;

    if (tokenizable.token) {
      return {
        hasToken: true,
        tokenValue: tokenizable.token,
      };
    }

    return {
      hasToken: false,
      tokenValue: "",
    };
  }

  protected hydrateAccountType(type: AccountType) {
    switch (type) {
      case AccountType.Checking:
        return "CHECKING";
      case AccountType.Savings:
        return "SAVINGS";
      default:
        return "";
    }
  }

  protected hydrateCheckType(type: CheckType) {
    switch (type) {
      case CheckType.Business:
        return "BUSINESS";
      case CheckType.Payroll:
        return "PAYROLL";
      case CheckType.Personal:
        return "PERSONAL";
      default:
        return "";
    }
  }

  protected hydrateEncryptionData(builder: BaseBuilder) {
    const enc = new Element("EncryptionData");
    const data = ((builder.paymentMethod as Object) as IEncryptable).encryptionData;

    if (data.version) {
      subElement(enc, "Version").append(cData(data.version));
    }

    if (data.trackNumber) {
      subElement(enc, "TrackNumber").append(cData(data.trackNumber));
    }

    if (data.ktb) {
      subElement(enc, "KTB").append(cData(data.ktb));
    }

    if (data.ksn) {
      subElement(enc, "KSN").append(cData(data.ksn));
    }

    return enc;
  }

  protected hydrateEntryMethod(method: EntryMethod) {
    switch (method) {
      case EntryMethod.Manual:
        return "Manual";
      case EntryMethod.Proximity:
        return "Proximity";
      case EntryMethod.Swipe:
        return "Swipe";
      default:
        return "";
    }
  }

  protected hydrateHolder(builder: AuthorizationBuilder, isCheck: boolean): Element {
    const holder = new Element(isCheck ? "ConsumerInfo" : "CardHolderData");
    subElement(holder, isCheck ? "Address1" : "CardHolderAddr")
      .append(cData(builder.address.streetAddress1));
    subElement(holder, isCheck ? "City" : "CardHolderCity")
      .append(cData(builder.address.city));
    subElement(holder, isCheck ? "State" : "CardHolderState")
      .append(cData(builder.address.province));
    subElement(holder, isCheck ? "Zip" : "CardHolderZip")
      .append(cData(builder.address.code));

    if (isCheck) {
      const check = builder.paymentMethod as ECheck;
      if (check.checkName) {
        const names = check.checkName.split(" ", 2);
        subElement(holder, "FirstName").append(cData(names[0]));

        if (names[1]) {
          subElement(holder, "LastName").append(cData(names[1]));
        }

        subElement(holder, "CheckName").append(cData(check.checkName));
      }

      if (check.phoneNumber) {
        subElement(holder, "PhoneNumber").append(cData(check.phoneNumber));
      }

      if (check.driversLicenseNumber) {
        subElement(holder, "DLNumber").append(cData(check.driversLicenseNumber));
      }

      if (check.driversLicenseState) {
        subElement(holder, "DLState").append(cData(check.driversLicenseState));
      }

      if (check.ssnLast4 || check.birthYear) {
        const identity = subElement(holder, "IdentityInfo");
        subElement(identity, "SSNL4").append(cData(check.ssnLast4));
        subElement(identity, "DOBYear").append(cData(check.birthYear));
      }
    }

    return holder;
  }

  protected hydrateInquiryType(type: InquiryType) {
    switch (type) {
      case InquiryType.Cash:
        return "CASH";
      case InquiryType.Foodstamp:
        return "FOODSTAMP";
      case InquiryType.Points:
        return "POINTS";
      case InquiryType.Standard:
        return "STANDARD";
      default:
        return "";
    }
  }

  protected hydrateManualEntry(builder: BaseBuilder, hasToken: boolean, tokenValue: string) {
    const me = new Element("ManualEntry");
    let card: CreditCardData | EBTCardData;
    if (builder.paymentMethod instanceof CreditCardData) {
      card = builder.paymentMethod as CreditCardData;
    } else {
      card = builder.paymentMethod as EBTCardData;
    }

    if (card.number) {
      subElement(me, hasToken ? "TokenValue" : "CardNbr")
        .append(cData(hasToken ? tokenValue : card.number));
    }

    if (card.expMonth) {
      subElement(me, "ExpMonth").append(cData(card.expMonth));
    }

    if (card.expYear) {
      subElement(me, "ExpYear").append(cData(card.expYear));
    }

    if (card.cvn) {
      subElement(me, "CVV2").append(cData(card.cvn));
    }

    subElement(me, "ReaderPresent").append(cData(card.readerPresent ? "Y" : "N"));
    subElement(me, "CardPresent").append(cData(card.cardPresent ? "Y" : "N"));

    return me;
  }

  protected hydrateSecCode(code: SecCode) {
    switch (code) {
      case SecCode.CCD:
        return "CCD";
      case SecCode.PPD:
        return "PPD";
      case SecCode.POP:
        return "POP";
      case SecCode.WEB:
        return "WEB";
      case SecCode.TEL:
        return "TEL";
      case SecCode.EBronze:
        return "EBRONZE";
      default:
        return "";
    }
  }

  protected hydrateTaxType(type: TaxType) {
    switch (type) {
      case TaxType.NotUsed:
        return "NOTUSED";
      case TaxType.SalesTax:
        return "SALESTAX";
      case TaxType.TaxExempt:
        return "TAXEXEMPT";
      default:
        return "";
    }
  }

  protected hydrateTrackData(builder: BaseBuilder, hasToken: boolean, tokenValue: string) {
    const trackData = new Element(hasToken ? "TokenValue" : "TrackData");

    if (hasToken) {
      subElement(trackData, "TokenValue").append(cData(tokenValue));
      return trackData;
    }

    let track: CreditTrackData | DebitTrackData | EBTTrackData;
    if (builder.paymentMethod instanceof CreditTrackData) {
      track = builder.paymentMethod as CreditTrackData;
    } else if (builder.paymentMethod instanceof DebitTrackData) {
      track = builder.paymentMethod as DebitTrackData;
    } else {
      track = builder.paymentMethod as EBTTrackData;
    }

    trackData.append(cData(track.value));
    if (track.paymentMethodType !== PaymentMethodType.Debit) {
      trackData.set("method", track.entryMethod === EntryMethod.Swipe ? "swipe" : "proximity");
    }

    return trackData;
  }
}
