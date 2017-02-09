import {
  AuthorizationBuilder,
  GiftCard,
  ManagementBuilder,
  TransactionModifier,
  TransactionReference,
  TransactionType,
} from "../";
export class Transaction {
  public authorizedAmount: string;
  public balanceAmount: string;
  public pointsBalanceAmount: string;
  public commercialIndicator: string;
  public responseCode: string;
  public responseMessage: string;
  public transactionReference: TransactionReference;
  public token: string;
  public giftCard: GiftCard;

  get transactionId(): string {
    return this.transactionReference.transactionId;
  }

  /**
   * Allows for a follow-up request to add an additional authorization
   *
   * @param string|number amount Amount to authorize
   *
   * @return AuthorizationBuilder
   */
  public additionalAuth(amount?: string | number) {
    return (new AuthorizationBuilder(TransactionType.Auth))
      .withPaymentMethod(this.transactionReference)
      .withAmount(amount);
  }

  /**
   * Allows for a follow-up request to add the transaction to an open batch
   *
   * @param string|number amount Amount to capture
   *
   * @return ManagementBuilder
   */
  public capture(amount?: string | number) {
    return (new ManagementBuilder(TransactionType.Capture))
      .withPaymentMethod(this.transactionReference)
      .withAmount(amount);
  }

  /**
   * Allows for a follow-up request to edit the transaction
   *
   * @return ManagementBuilder
   */
  public edit() {
    let builder = (new ManagementBuilder(TransactionType.Edit))
      .withPaymentMethod(this.transactionReference);

    if (this.commercialIndicator !== null) {
      builder = builder.withModifier(TransactionModifier.LevelII);
    }

    return builder;
  }

  /**
   * Allows for a follow-up request to refund the transaction
   *
   * @param string|number amount Amount to refund
   *
   * @return ManagementBuilder
   */
  public refund(amount?: string | number) {
    return (new ManagementBuilder(TransactionType.Refund))
      .withPaymentMethod(this.transactionReference)
      .withAmount(amount);
  }

  /**
   * Allows for a follow-up request to reverse the transaction
   *
   * @param string|number amount Amount to reverse
   *
   * @return ManagementBuilder
   */
  public reverse(amount?: string | number) {
    return (new ManagementBuilder(TransactionType.Reversal))
      .withPaymentMethod(this.transactionReference)
      .withAmount(amount);
  }

  /**
   * Allows for a follow-up request to void the transaction
   *
   * @return ManagementBuilder
   */
  public void() {
    return (new ManagementBuilder(TransactionType.Void))
      .withPaymentMethod(this.transactionReference);
  }
}
