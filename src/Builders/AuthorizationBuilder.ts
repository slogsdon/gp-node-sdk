import {
  Address,
  // addressType,
  AliasAction,
  // ecommerceInfo,
  GiftCard,
  // hostedPaymentData,
  InquiryType,
  IPaymentMethod,
  PaymentMethod,
  PaymentMethodType,
  // recurringSequence,
  // recurringType,
  ServicesContainer,
  Transaction,
  TransactionModifier,
  TransactionReference,
  TransactionType,
  // unsupportedTransactionError,
} from "../";
import { TransactionBuilder } from "./TransactionBuilder";

export class AuthorizationBuilder
  extends TransactionBuilder<Transaction> {
  public alias: string;
  public aliasAction: AliasAction;
  public allowDuplicates: boolean;
  public allowPartialAuth: boolean;
  public amount: string | number;
  public authAmount: string | number;
  public balanceInquiryType: InquiryType;
  public billingAddress: Address;
  public cashBackAmount: string | number;
  public clientTransactionId: string;
  public currency: string;
  public customerId: string;
  public cvn: string;
  public description: string;
  public dynamicDescriptor: string;
  // public ecommerceInfo: EcommerceInfo;
  public gratuity: string | number;
  // public hostedPaymentData: HostedPaymentData;
  public invoiceNumber: string;
  public level2Request: boolean;
  public offlineAuthCode: string;
  public oneTimePayment: boolean;
  public orderId: string;
  // public recurringSequence: RecurringSequence;
  // public recurringType: RecurringType;
  public requestMultiUseToken: boolean;
  public replacementCard: GiftCard;
  public scheduleId: string;
  public shippingAddress: Address;
  public timestamp: string;

  public constructor(type: number, paymentMethod?: IPaymentMethod) {
    super(type, paymentMethod);

    if (paymentMethod) {
      this.paymentMethod = paymentMethod as PaymentMethod;
    }
  }

  public execute(): Promise<Transaction> {
    super.execute();
    return ServicesContainer.instance()
      .getClient()
      .processAuthorization(this);
  }

  protected setupValidations(): void {
    this.validations.of(
      "transactionType",
      /* tslint:disable:trailing-comma */
      TransactionType.Auth |
      TransactionType.Sale |
      TransactionType.Refund |
      TransactionType.AddValue
      /* tslint:enable:trailing-comma */
    )
      .check("amount").isNotNull()
      .check("currency").isNotNull()
      .check("paymentMethod").isNotNull();

    this.validations.of(
      "transactionType",
      /* tslint:disable:trailing-comma */
      TransactionType.Auth |
      TransactionType.Sale
      /* tslint:enable:trailing-comma */
    )
      .with("transactionModifier", TransactionModifier.Offline)
      .check("amount").isNotNull()
      .check("currency").isNotNull()
      .check("offlineAuthCode").isNotNull()
      .check("offlineAuthCode").isNotEmpty();

    this.validations.of("transactionType", TransactionType.Balance)
      .check("paymentMethod").isNotNull();

    this.validations.of("transactionType", TransactionType.Alias)
      .check("aliasAction").isNotNull()
      .check("alias").isNotNull();

    this.validations.of("transactionType", TransactionType.Replace)
      .check("replacementCard").isNotNull();

    this.validations.of("paymentMethodType", PaymentMethodType.ACH)
      .check("address").isNotNull();
  }

  public withAddress(address?: Address, addressType = "") { // addressType.Billing) {
    if (address === undefined) {
      return this;
    }

    address.type = addressType;

    if (addressType === "") { // addressType.Billing) {
      this.billingAddress = address;
    } else {
      this.shippingAddress = address;
    }

    return this;
  }

  public withAlias(aliasAction: AliasAction, alias?: string) {
    if (alias !== undefined) {
      this.alias = alias;
    }
    this.aliasAction = aliasAction;
    return this;
  }

  public WithAllowDuplicates(allowDuplicates?: boolean) {
    if (allowDuplicates !== undefined) {
      this.allowDuplicates = allowDuplicates;
    }
    return this;
  }

  public withAllowPartialAuth(allowPartialAuth?: boolean) {
    if (allowPartialAuth !== undefined) {
      this.allowPartialAuth = allowPartialAuth;
    }
    return this;
  }

  public withAmount(amount?: string | number) {
    if (amount !== undefined) {
      this.amount = amount;
    }
    return this;
  }

  public withAuthAmount(authAmount?: string | number) {
    if (authAmount !== undefined) {
      this.authAmount = authAmount;
    }
    return this;
  }

  public withBalanceInquiryType(inquiry?: InquiryType) {
    if (inquiry !== undefined) {
      this.balanceInquiryType = inquiry;
    }
    return this;
  }

  public withCashBack(amount?: string | number) {
    if (amount !== undefined) {
      this.cashBackAmount = amount;
      this.transactionModifier = TransactionModifier.CashBack;
    }
    return this;
  }

  public withClientTransactionId(clientTransactionId?: string) {
    if (clientTransactionId === undefined) {
      return this;
    }

    if (this.transactionType !== TransactionType.Reversal &&
      this.transactionType !== TransactionType.Refund
    ) {
      this.clientTransactionId = clientTransactionId;
      return this;
    }

    if (!(this.paymentMethod instanceof TransactionReference)) {
      this.paymentMethod = (new TransactionReference() as IPaymentMethod) as PaymentMethod;
    }

    // ((this.paymentMethod as IPaymentMethod) as TransactionReference).clientTransactionId = clientTransactionId;
    return this;
  }

  public withCurrency(currency?: string) {
    if (currency !== undefined) {
      this.currency = currency;
    }
    return this;
  }

  public withCustomerId(customerId?: string) {
    if (customerId !== undefined) {
      this.customerId = customerId;
    }
    return this;
  }

  public withCvn(cvn?: string) {
    if (cvn !== undefined) {
      this.cvn = cvn;
    }
    return this;
  }

  public withDescription(description?: string) {
    if (description !== undefined) {
      this.description = description;
    }
    return this;
  }

  public withDynamicDescriptor(dynamicDescriptor?: string) {
    if (dynamicDescriptor !== undefined) {
      this.dynamicDescriptor = dynamicDescriptor;
    }
    return this;
  }

  public withEcommerceInfo(ecommerceInfo?: object) { // ecommerceInfo) {
    if (ecommerceInfo !== undefined) {
      this.ecommerceInfo = ecommerceInfo;
    }
    return this;
  }

  public withGratuity(gratuity?: string | number) {
    if (gratuity !== undefined) {
      this.gratuity = gratuity;
    }
    return this;
  }

  public withHostedPaymentData(hostedPaymentData?: object) { // hostedPaymentData) {
    // const client = ServicesContainer.instance().getClient();

    // if (!client.supportsHostedPayments) {
    //   throw new UnsupportedTransactionError("Your current gateway does not support hosted payments.");
    // }

    if (hostedPaymentData !== undefined) {
      this.hostedPaymentData = hostedPaymentData;
    }
    return this;
  }

  public withInvoiceNumber(invoiceNumber?: string) {
    if (invoiceNumber !== undefined) {
      this.invoiceNumber = invoiceNumber;
    }
    return this;
  }

  public withCommercialRequest(level2Request?: boolean) {
    if (level2Request !== undefined) {
      this.level2Request = level2Request;
    }
    return this;
  }

  public withOfflineAuthCode(offlineAuthCode?: string) {
    if (offlineAuthCode !== undefined) {
      this.offlineAuthCode = offlineAuthCode;
      this.transactionModifier = TransactionModifier.Offline;
    }
    return this;
  }

  public withOneTimePayment(oneTimePayment?: boolean) {
    if (oneTimePayment !== undefined) {
      this.oneTimePayment = oneTimePayment;
    }
    return this;
  }

  public withOrderId(orderId?: string) {
    if (orderId !== undefined) {
      this.orderId = orderId;
    }
    return this;
  }

  public withRequestMultiUseToken(requestMultiUseToken?: boolean) {
    if (requestMultiUseToken !== undefined) {
      this.requestMultiUseToken = requestMultiUseToken;
    }
    return this;
  }

  public withTransactionId(transactionId?: string) {
    if (transactionId !== undefined) {
      return this.withPaymentMethod(new TransactionReference(transactionId));
    }
    return this;
  }

  public withReplacementCard(replacementCard?: GiftCard) {
    if (replacementCard !== undefined) {
      this.replacementCard = replacementCard;
    }
    return this;
  }
}
