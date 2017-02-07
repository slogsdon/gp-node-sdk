import {
  AuthorizationBuilder,
  InquiryType,
  NotImplementedError,
  PaymentMethodType,
  TransactionType,
} from "../";
import {
  IBalanceable,
  IChargable,
  IEncryptable,
  IPaymentMethod,
  IPinProtected,
  IPrePayable,
  IRefundable,
  IReversable,
} from "./Interfaces";

export abstract class EBT implements
  IPaymentMethod,
  IBalanceable,
  IChargable,
  IEncryptable,
  IRefundable,
  IReversable,
  IPrePayable,
  IPinProtected {
  public paymentMethodType: PaymentMethodType = PaymentMethodType.Credit;
  public pinBlock: string;

  /**
   * Authorizes the payment method and captures the entire authorized amount
   *
   * @param string|number amount Amount to authorize
   *
   * @return AuthorizationBuilder
   */
  public charge(amount?: string) {
    return (new AuthorizationBuilder(TransactionType.Sale, this))
      .withAmount(amount);
  }

  /**
   * Adds value to the payment method
   *
   * @param string|number amount Amount to add
   *
   * @return AuthorizationBuilder
   */
  public addValue(amount?: string) {
    return (new AuthorizationBuilder(TransactionType.AddValue, this))
      .withAmount(amount);
  }

  /**
   * Inquires the balance of the payment method
   *
   * @param InquiryType inquiry Type of inquiry
   *
   * @return AuthorizationBuilder
   */
  public balanceInquiry(inquiry?: InquiryType) {
    return (new AuthorizationBuilder(TransactionType.Balance, this))
      .withBalanceInquiryType(inquiry);
  }

  /**
   * Refunds the payment method
   *
   * @param string|number amount Amount to refund
   *
   * @return AuthorizationBuilder
   */
  public refund(amount?: string) {
    return (new AuthorizationBuilder(TransactionType.Refund, this))
      .withAmount(amount);
  }

  /**
   * Reverses the payment method
   *
   * @param string|number amount Amount to reverse
   *
   * @return AuthorizationBuilder
   */
  public reverse(_amount?: string): AuthorizationBuilder {
    throw new NotImplementedError();
  }
}
