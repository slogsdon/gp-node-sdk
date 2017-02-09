import {
  ArgumentError,
  Transaction,
  TransactionModifier,
  TransactionType,
} from "../";
import { IPaymentMethod } from "../PaymentMethods/Interfaces";
import { Validations } from "./BaseBuilder/Validations";

export abstract class BaseBuilder {
  protected validations: Validations;
  protected executed: boolean;
  public transactionType: TransactionType;
  public transactionModifier = TransactionModifier.None;
  public paymentMethod: IPaymentMethod;
  [key: string]: any;

  public constructor(type: TransactionType, _paymentMethod?: IPaymentMethod) {
    this.transactionType = type;
    this.validations = new Validations();
    this.setupValidations();
  }

  public execute(): Promise<Transaction> {
    this.validate();
    return Promise.resolve(new Transaction());
  }

  public withModifier(modifier?: TransactionModifier) {
    if (modifier) {
      this.transactionModifier = modifier;
    }
    return this;
  }

  public withPaymentMethod(paymentMethod?: IPaymentMethod) {
    if (paymentMethod) {
      this.paymentMethod = paymentMethod;
    }
    return this;
  }

  protected abstract setupValidations(): void;

  protected validate(): void {
    Object.keys(this.validations.rules).forEach((key) => {
      const iKey = parseInt(key, 10);
      if ((iKey & this.transactionType) !== this.transactionType) {
        return;
      }

      for (const validation of this.validations.rules[iKey]) {
        if (!validation.clause) {
          continue;
        }

        if (!validation.clause.callback(this)) {
          throw new ArgumentError(validation.clause.message);
        }
      }
    });
  }
}
