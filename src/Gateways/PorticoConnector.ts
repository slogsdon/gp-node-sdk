import {
  CData as cData,
  Element,
  Element as element,
  ElementTree,
  SubElement as subElement,
  XML as xml,
} from "@derflatulator/elementtree";

import {
  AuthorizationBuilder,
  CreditCard,
  ManageTransactionBuilder,
  Transaction,
  TransactionType,
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
    const transaction = element(this.mapRequestType(builder.transactionType));
    // const transaction = Element(builder.transactionType);
    const block1 = subElement(transaction, "Block1");
    subElement(block1, "AllowDup").append(cData(builder.allowDuplicates ? "Y" : "N"));
    subElement(block1, "AllowPartialAuth").append(cData(builder.allowPartialAuth ? "Y" : "N"));
    subElement(block1, "Amt").append(cData(builder.amount));
    if (builder.gratuity) {
      subElement(block1, "GratuityAmtInfo").append(cData(builder.gratuity));
    }

    // card holder
    // if (address != null) {
    //    const holder = SubElement(block1, "CardHolderData");
    //    if (cardHolderName != null) {
    //        const names = cardHolderName.Split(new char[] { " " }, 2);
    //        subElement(holder, "CardHolderFirstName").append(cData(names[0]));
    //        if (names.Length > 1)
    //            subElement(holder, "CardHolderLastName").append(cData(names[1]));
    //    }
    //    subElement(holder, "CardHolderAddr").append(cData(address.StreetAddress));
    //    subElement(holder, "CardHolderCity").append(cData(address.City));
    //    subElement(holder, "CardHolderState").append(cData(address.Province ? address.Province : address.State));
    //    subElement(holder, "CardHolderZip").append(cData(address.Code));
    // }

    // card data
    const cardData = subElement(block1, "CardData");
    if (builder.paymentMethod instanceof CreditCard) {
      const card: CreditCard = builder.paymentMethod;
      const manualEntry = subElement(cardData, "ManualEntry");
      subElement(manualEntry, "CardNbr").append(cData(card.number));
      subElement(manualEntry, "ExpMonth").append(cData(card.expMonth));
      subElement(manualEntry, "ExpYear").append(cData(card.expYear));
      subElement(manualEntry, "CVV2").append(cData(card.cvn));
      subElement(manualEntry, "ReaderPresent").append(cData(card.readerPresent ? "Y" : "N"));
      subElement(manualEntry, "CardPresent").append(cData(card.cardPresent ? "Y" : "N"));
    }
    // token
    // trackdata
    // payment data
    subElement(cardData, "TokenRequest").append(cData(builder.requestMultiUseToken ? "Y" : "N"));

    // cpc request
    if (builder.level2Request) {
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

    // auto substantiation

    // original txn reference data
    // if (StringUtils.AnyHaveValue(authorizationCode, cardLast4)) {
    //    const reference = SubElement(block1, "OrigTxnRefData");
    //    subElement(reference, "AuthCode").append(cData(authorizationCode));
    //    subElement(reference, "CardNbrLastFour").append(cData(cardLast4));
    // }

    return new Promise((resolve, reject) => {
      this.doTransaction(this.buildEnvelope(transaction))
        .then((response) => resolve(this.mapResponse(response)))
        .catch(reject);
    });
  }

  public manageTransaction(builder: ManageTransactionBuilder): Promise<Transaction> {
    // build request
    const transaction = element(this.mapRequestType(builder.transactionType));

    // amount
    if (builder.amount) {
      subElement(transaction, "Amt").append(cData(builder.amount));
    }

    // gratuity
    if (builder.gratuity) {
      subElement(transaction, "GratuityAmtInfo").append(cData(builder.gratuity));
    }

    // transaction ID
    if (builder.transactionId) {
      subElement(transaction, "GatewayTxnId").append(cData(builder.transactionId));
    }

    // level II Data
    if (builder.transactionType === TransactionType.CreditCpcEdit) {
      const cpc = subElement(transaction, "CPCData");
      subElement(cpc, "CardHolderPONbr").append(cData(builder.poNumber));
      // subElement(cpc, "TaxType").append(cData(builder.taxType));
      // subElement(cpc, "TaxAmt").append(cData(builder.taxAmount));
    }

    return new Promise((resolve, reject) => {
      this.doTransaction(this.buildEnvelope(transaction))
        .then((response) => resolve(this.mapResponse(response)))
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

  protected mapRequestType(type: TransactionType): string {
    switch (type) {
      case TransactionType.CreditAuth:
        return "CreditAuth";
      case TransactionType.CreditSale:
        return "CreditSale";
      case TransactionType.CreditAccountVerify:
        return "CreditAccountVerify";
      case TransactionType.CreditAddToBatch:
        return "CreditAddToBatch";
      case TransactionType.CreditReturn:
        return "CreditReturn";
      case TransactionType.CreditReversal:
        return "CreditReversal";
      case TransactionType.CreditOfflineAuth:
        return "CreditOfflineAuth";
      case TransactionType.CreditOfflineSale:
        return "CreditOfflineSale";
      case TransactionType.CreditVoid:
        return "CreditVoid";
      default:
        return "Unknown";
    }
  }

  protected mapResponse(rawResponse: string): Transaction {
    const result = new Transaction();

    // todo: handle non-200 responses

    const root = xml(rawResponse).find(".//PosResponse");
    const acceptedCodes = [ "00", "0", "85", "10" ];

    let gatewayRspCode = root.findtext(".//GatewayRspCode");
    const gatewayRspText = root.findtext(".//GatewayRspMsg");

    if (acceptedCodes.indexOf(gatewayRspCode) === -1) {
      throw new Error(`Unexpected Gateway Response: ${gatewayRspCode} - ${gatewayRspText}`);
    }

    if (["0", "85"].indexOf(gatewayRspCode) !== -1) {
        gatewayRspCode = "00";
    }

    result.responseCode = root.findtext(".//RspCode")
        ? root.findtext(".//RspCode")
        : gatewayRspCode;
    result.responseMessage = root.findtext(".//RspText")
        ? root.findtext(".//RspText")
        : gatewayRspText;
    result.transactionId = root.findtext(".//GatewayTxnId");

    return result;
  }
}
