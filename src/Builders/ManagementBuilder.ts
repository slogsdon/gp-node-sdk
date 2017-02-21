import {
  IPaymentMethod,
  ServicesContainer,
  TaxType,
  Transaction,
  TransactionModifier,
  TransactionType,
} from "../";
import { BaseBuilder } from "./BaseBuilder";

export class ManagementBuilder
  extends BaseBuilder {
  public amount: string | number;
  public authAmount: string | number;
  public currency: string;
  public gratuity: string | number;
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
      .check("paymentMethod").isNotNull();

    this.validations.of(TransactionType.Edit)
      .with(TransactionModifier.LevelII)
      .check("taxType").isNotNull()
      .check("taxAmount").isNotNull()
      .check("poNumber").isNotNull();
  }

  public withAmount(amount?: string | number) {
    if (amount !== undefined) {
      this.amount = amount;
    }
    return this;
  }

  public withAuthAmount(amount?: string | number) {
    if (amount !== undefined) {
      this.authAmount = amount;
    }
    return this;
  }

  public withCurrency(currency?: string) {
    if (currency !== undefined) {
      this.currency = currency;
    }
    return this;
  }

  public withGratuity(gratuity?: string | number) {
    if (gratuity !== undefined) {
      this.gratuity = gratuity;
    }
    return this;
  }

  public withPoNumber(poNumber?: string) {
    if (poNumber !== undefined) {
      this.poNumber = poNumber;
    }
    return this;
  }

  public withTaxType(type?: TaxType) {
    if (type !== undefined) {
      this.taxType = type;
    }
    return this;
  }

  public withTaxAmount(amount?: string | number) {
    if (amount !== undefined) {
      this.taxAmount = amount;
    }
    return this;
  }
}
