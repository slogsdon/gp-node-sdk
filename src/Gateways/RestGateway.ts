import * as https from "https";
import { Socket } from "net";
import * as url from "url";

import {
  ApiError,
  GatewayError,
} from "../Entities";

export interface IDictionary<T> {
  [key: string]: T;
}

export abstract class RestGateway {
  public static AUTHORIZATION_HEADER = "Authorization";

  public timeout: number;
  public serviceUrl: string;
  public headers: IDictionary<string>;

  public constructor() {
    this.headers = {};
  }

  protected doTransaction(verb: string, endpoint: string, requestData?: string, queryStringParams?: IDictionary<string>): Promise<string> {
    let queryString = "";
    if (queryStringParams) {
      const pairs: string[] = [];
      for (const key in queryStringParams) {
        if (queryStringParams.hasOwnProperty(key)) {
          pairs.push(`${key}=${queryStringParams[key]}`);
        }
      }
      queryString = "?" + pairs.join("&");
    }

    const headers: IDictionary<string> = {
      "Content-Type": "application/json; charset=\"utf-8\"",
      "SoapAction": "\"\"",
    };
    if (requestData) {
      headers["Content-Length"] = requestData.length.toString();
    }

    const uri = url.parse(this.serviceUrl + endpoint + queryString);
    const options: https.RequestOptions = {
      headers,
      host: uri.host,
      method: verb,
      path: uri.path,
      port: uri.port ? parseInt(uri.port, 10) : 443,
    };

    return new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let data = "";

        res.on("data", (d: string) => data += d);
        res.on("end", () => {
          if (res.statusCode !== 200) {
            reject(new GatewayError(
              `Unexpected HTTP status code [${res.statusCode}]`,
            ));
          }

          resolve(data);
        });
        res.on("error", reject);
      });
      req.on("socket", (socket: Socket) => {
        socket.setTimeout(this.timeout);
        socket.on("timeout", () => {
          req.abort();
          reject(new ApiError("Socket timeout occurred."));
        });
      });
      req.on("error", reject);
      if (requestData) {
        req.write(requestData);
      }
      req.end();
    });
  }
}
