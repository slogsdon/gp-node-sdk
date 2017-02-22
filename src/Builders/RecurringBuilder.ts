import {
  ServicesContainer,
} from "../";
import { TransactionBuilder } from "./TransactionBuilder";

/* tslint:disable:no-empty-interface */
export interface IRecurringEntity {
}
/* tslint:enable:no-empty-interface */

export class RecurringBuilder<T>
  extends TransactionBuilder<T> {
  public orderId: string;
  public create: IRecurringEntity;
  public edit: IRecurringEntity;

  public execute(): Promise<T> {
    super.execute();
    return ServicesContainer.instance()
      .getRecurringClient()
      .processRecurring(this);
  }

  public setupValidations() {
    // todo
  }
}
