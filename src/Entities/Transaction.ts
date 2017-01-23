import {
  ManageTransactionBuilder,
  TransactionType,
} from "../";
export class Transaction {
  public responseCode: string;
  public responseMessage: string;
  public transactionId: string;

  public capture(amount?: string) {
    return (new ManageTransactionBuilder(TransactionType.CreditAddToBatch))
        .withTransactionId(this.transactionId)
        .withAmount(amount);
  }
}
