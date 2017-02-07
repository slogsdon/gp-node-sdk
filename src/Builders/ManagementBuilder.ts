import {
  IPaymentMethod,
  ServicesContainer,
  Transaction,
  TransactionType,
} from "../";
import { BaseBuilder } from "./BaseBuilder";

export class ManagementBuilder
  extends BaseBuilder {
  public amount: string;
  public currency: string;
  public gratuity: string;
  public poNumber: string;
  public paymentMethod: IPaymentMethod;

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

  public withAmount(amount?: string) {
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

  public withPaymentMethod(paymentMethod?: IPaymentMethod) {
    if (paymentMethod) {
      this.paymentMethod = paymentMethod;
    }
    return this;
  }
}
