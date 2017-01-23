import { PaymentMethod } from "./PaymentMethod";

export class TransactionReference extends PaymentMethod {
  public authCode: string;
  public transactionId: string;

  public constructor(transactionId: string) {
    super();
    this.transactionId = transactionId;
  }
}
