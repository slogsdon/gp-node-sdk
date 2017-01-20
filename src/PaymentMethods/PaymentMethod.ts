import {
  AuthorizationBuilder,
  IPaymentMethod,
  ServicesContainer,
  TransactionType,
} from "../";

export abstract class PaymentMethod implements IPaymentMethod {
  public container: ServicesContainer;

  public constructor() {
    this.container = ServicesContainer.instance();
  }

  public authorize(amount?: string) {
    return (new AuthorizationBuilder(TransactionType.CreditAuth, this))
      .withAmount(amount);
  }
}
