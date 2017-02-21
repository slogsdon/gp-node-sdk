import {
  Address,
  AliasAction,
  GiftCard,
  InquiryType,
  IPaymentMethod,
  PaymentMethod,
  ServicesContainer,
  Transaction,
  TransactionModifier,
  TransactionReference,
  TransactionType,
} from "../";
import { BaseBuilder } from "./BaseBuilder";

export class AuthorizationBuilder
  extends BaseBuilder {
  public address: Address;
  public alias: string;
  public aliasAction: AliasAction;
  public allowPartialAuth: boolean;
  public amount: string | number;
  public cashBackAmount: string | number;
  public currency: string;
  public customerId: string;
  public description: string;
  public dynamicDescriptor: string;
  public gratuity: string | number;
  public invoiceNumber: string;
  public level2Request: boolean;
  public offlineAuthCode: string;
  public orderId: string;
  public requestMultiUseToken: boolean;
  public balanceInquiryType: InquiryType;
  public replacementCard: GiftCard;

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
      /* tslint:disable:trailing-comma */
      TransactionType.Auth |
      TransactionType.Sale
      /* tslint:enable:trailing-comma */
    )
      .with(TransactionModifier.Offline)
      .check("amount").isNotNull()
      .check("currency").isNotNull()
      .check("offlineAuthCode").isNotNull();

    this.validations.of(TransactionType.Balance)
      .check("paymentMethod").isNotNull();

    this.validations.of(TransactionType.Alias)
      .check("aliasAction").isNotNull()
      .check("alias").isNotNull();

    this.validations.of(TransactionType.Replace)
      .check("replacementCard").isNotNull();
  }

  public withAddress(address?: Address) {
    if (address !== undefined) {
      this.address = address;
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

  public withCashBack(amount?: string | number) {
    if (amount !== undefined) {
      this.cashBackAmount = amount;
      this.transactionModifier = TransactionModifier.CashBack;
    }
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

  public withGratuity(gratuity?: string | number) {
    if (gratuity !== undefined) {
      this.gratuity = gratuity;
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

  public withBalanceInquiryType(inquiry?: InquiryType) {
    if (inquiry !== undefined) {
      this.balanceInquiryType = inquiry;
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
