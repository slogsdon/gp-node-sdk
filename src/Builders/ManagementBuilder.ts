import {
  IPaymentMethod,
  ServicesContainer,
  TaxType,
  Transaction,
  TransactionType,
} from "../";
import { BaseBuilder } from "./BaseBuilder";

export class ManagementBuilder
  extends BaseBuilder {
  public amount: string | number;
  public currency: string;
  public gratuity: string;
  public poNumber: string;
  public taxType: TaxType;
  public taxAmount: string | number;

  public constructor(type: number, paymentMethod?: IPaymentMethod) {
    super(type, paymentMethod);
  }

  public execute(): Promise<Transaction> {
    super.execute();
    return ServicesContainer.instance()
      .getClient()
      .manageTransaction(this);
  }

  protected setupValidations() {
    this.validations.of(
      /* tslint:disable:trailing-comma */
      TransactionType.Capture |
      TransactionType.Edit
      /* tslint:enable:trailing-comma */
    )
      .check("transactionId").isNotNull();

    this.validations.of(TransactionType.Edit)
      .check("taxType").isNotNull()
      .check("taxAmount").isNotNull()
      .check("poNumber").isNotNull();
  }

  public withAmount(amount?: string | number) {
    if (amount) {
      this.amount = amount;
    }
    return this;
  }

  public withGratuity(gratuity?: string) {
    if (gratuity) {
      this.gratuity = gratuity;
    }
    return this;
  }

  public withPoNumber(poNumber?: string) {
    if (poNumber) {
      this.poNumber = poNumber;
    }
    return this;
  }

  public withTaxType(type?: TaxType) {
    if (type) {
      this.taxType = type;
    }
    return this;
  }

  public withTaxAmount(amount?: string | number) {
    if (amount) {
      this.taxAmount = amount;
    }
    return this;
  }
}
