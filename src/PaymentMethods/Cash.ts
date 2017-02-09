import {
  AuthorizationBuilder,
  NotImplementedError,
  PaymentMethodType,
} from "../";
import {
  IChargable,
  IPaymentMethod,
  IRefundable,
} from "./Interfaces";

export class Cash implements
    IPaymentMethod,
    IChargable,
    IRefundable {
    public paymentMethodType = PaymentMethodType.Cash;

    public charge(_amount?: string | number): AuthorizationBuilder {
        throw new NotImplementedError();
    }

    public refund(_amount?: string | number): AuthorizationBuilder {
        throw new NotImplementedError();
    }
}
