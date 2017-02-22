import {
  RecurringBuilder,
} from "../";

export interface IRecurringService {
  supportRetrieval: boolean;
  processRecurring<T>(builder: RecurringBuilder<T>): Promise<T>;
}
