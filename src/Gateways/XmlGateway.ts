import * as https from "https";
import {Socket} from "net";
import * as url from "url";

import {
  AuthorizationBuilder,
  ManageTransactionBuilder,
} from "../Builders";
import { Transaction } from "../Entities";
import { IGateway } from "./IGateway";

export abstract class XmlGateway implements IGateway {
  public timeout: number;
  public serviceUrl: string;

  public abstract processAuthorization(builder: AuthorizationBuilder): Promise<Transaction>;
  public abstract manageTransaction(builder: ManageTransactionBuilder): Promise<Transaction>;

  protected doTransaction(requestData: string): Promise<string> {
    const uri = url.parse(this.serviceUrl);
    const options: https.RequestOptions = {
      headers: {
        "Content-Length": requestData.length,
        "Content-Type": "text/xml; charset=\"utf-8\"",
        "SoapAction": "\"\"",
      },
      host: uri.host,
      method: "POST",
      path: uri.path,
      port: uri.port ? parseInt(uri.port, 10) : 443,
    };

    return new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let data = "";

        res.on("data", (d: string) => data += d);
        res.on("end", () => {
          if (res.statusCode !== 200) {
            reject();
          }

          resolve(data);
        });
      });
      req.on("socket", (socket: Socket) => {
        socket.setTimeout(this.timeout);
        socket.on("timeout", () => req.abort());
      });
      req.on("error", reject);
      req.write(requestData);
      req.end();
    });
  }
}
