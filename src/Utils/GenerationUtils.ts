import * as uuid from "uuid";
import * as sha1 from "sha1";

import { StringUtils } from "../";

export class GenerationUtils {
  public static generateHash(toHash: string, secret: string): string {
    const toHashFirstPass = sha1(toHash).toString();
    const toHashSecondPass = `${toHashFirstPass}.${secret}`;
    return sha1(toHashSecondPass).toString();
  }

  public static generateTimestamp(): string {
    const date = new Date();
    return date.getUTCFullYear().toString()
      + StringUtils.leftPad((date.getUTCMonth() + 1).toString(), 2, "0")
      + StringUtils.leftPad(date.getUTCDate().toString(), 2, "0")
      + StringUtils.leftPad(date.getUTCHours().toString(), 2, "0")
      + StringUtils.leftPad(date.getUTCMinutes().toString(), 2, "0")
      + StringUtils.leftPad(date.getUTCSeconds().toString(), 2, "0");
  }

  public static generateOrderId(): string {
    const id = uuid.genV4();
    return Buffer.from(id.toString(), "ascii")
      .toString("base64")
      .replace("=", "")
      .replace("+", "-")
      .replace("/", "_");
  }
}
