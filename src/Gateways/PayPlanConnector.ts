import {
  IRecurringService,
  NotImplementedError,
  RecurringBuilder,
} from "../";
import { RestGateway } from "./RestGateway";

export class PayPlanConnector extends RestGateway implements IRecurringService {
  public supportRetrieval = true;
  private _secretApiKey: string;

  get secretApiKey() {
    return this._secretApiKey;
  }

  set secretApiKey(value: string) {
    this._secretApiKey = value;
    const buffer = new Buffer(value);
    const auth = `Basic ${buffer.toString("base64")}`;
    this.headers[RestGateway.AUTHORIZATION_HEADER] = auth;
  }

  public processRecurring<T>(_builder: RecurringBuilder<T>): Promise<T> {
    // todo
    throw new NotImplementedError();
  }
}
