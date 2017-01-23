import {
  IPaymentMethod,
  ServicesContainer,
  Transaction,
  TransactionReference,
  TransactionType,
} from "../";
import { BaseBuilder } from "./BaseBuilder";

export class AuthorizationBuilder
  extends BaseBuilder {
  public allowDuplicates: boolean;
  public allowPartialAuth: boolean;
  public amount: string;
  public currency: string;
  public customerId: string;
  public description: string;
  public dynamicDescriptor: string;
  public gratuity: string;
  public invoiceNumber: string;
  public level2Request: boolean;
  public offlineAuthCode: string;
  public orderId: string;
  public paymentMethod: IPaymentMethod;
  public requestMultiUseToken: boolean;

  public constructor(type: number, paymentMethod?: IPaymentMethod) {
    super(type, paymentMethod);

    if (paymentMethod) {
      this.paymentMethod = paymentMethod;
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
      TransactionType.CreditAuth |
      TransactionType.CreditSale |
      TransactionType.CreditReturn
      /* tslint:enable:trailing-comma */
    )
      .check("amount").isNotNull()
      .check("currency").isNotNull()
      .check("paymentMethod").isNotNull();

    this.validations.of(
      /* tslint:disable:trailing-comma */
      TransactionType.CreditOfflineAuth |
      TransactionType.CreditOfflineSale
      /* tslint:enable:trailing-comma */
    )
      .check("offlineAuthCode").isNotNull();
  }

  public withAllowDuplicates(allowDuplicates?: boolean) {
    if (allowDuplicates) {
      this.allowDuplicates = allowDuplicates;
    }
    return this;
  }

  public withAllowPartialAuth(allowPartialAuth?: boolean) {
    if (allowPartialAuth) {
      this.allowPartialAuth = allowPartialAuth;
    }
    return this;
  }

  public withAmount(amount?: string) {
    if (amount) {
      this.amount = amount;
    }
    return this;
  }

  public withCurrency(currency?: string) {
    if (currency) {
      this.currency = currency;
    }
    return this;
  }

  public withCustomerId(customerId?: string) {
    if (customerId) {
      this.customerId = customerId;
    }
    return this;
  }

  public withDescription(description?: string) {
    if (description) {
      this.description = description;
    }
    return this;
  }

  public withDynamicDescriptor(dynamicDescriptor?: string) {
    if (dynamicDescriptor) {
      this.dynamicDescriptor = dynamicDescriptor;
    }
    return this;
  }

  public withGratuity(gratuity?: string) {
    if (gratuity) {
      this.gratuity = gratuity;
    }
    return this;
  }

  public withInvoiceNumber(invoiceNumber?: string) {
    if (invoiceNumber) {
      this.invoiceNumber = invoiceNumber;
    }
    return this;
  }

  public withLevel2Request(level2Request?: boolean) {
    if (level2Request) {
      this.level2Request = level2Request;
    }
    return this;
  }

  public withOfflineAuthCode(offlineAuthCode?: string) {
    if (offlineAuthCode) {
      this.offlineAuthCode = offlineAuthCode;
    }
    return this;
  }

  public withOrderId(orderId?: string) {
    if (orderId) {
      this.orderId = orderId;
    }
    return this;
  }

  public withPaymentMethod(paymentMethod?: IPaymentMethod) {
    if (paymentMethod) {
      this.paymentMethod = paymentMethod;
    }
    return this;
  }

  public withRequestMultiUseToken(requestMultiUseToken?: boolean) {
    if (requestMultiUseToken) {
      this.requestMultiUseToken = requestMultiUseToken;
    }
    return this;
  }

  public withTransactionId(transactionId?: string) {
    if (transactionId) {
      this.paymentMethod = new TransactionReference(transactionId);
    }
    return this;
  }
}
