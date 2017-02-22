export class ServicesConfig {
  // portico
  public siteId: string;
  public licenseId: string;
  public deviceId: string;
  public username: string;
  public password: string;
  public developerId: string;
  public versionNumber: string;
  public secretApiKey: string;

  // realex
  public accountId: string;
  public merchantId: string;
  public sharedSecret: string;
  public channel: string;
  public rebatePassword: string;
  public refundPassword: string;

  // common
  public serviceUrl: string;
  public timeout: number;

  public constructor() {
    this.timeout = 65000;
  }

  public validate() {
    //
  }
}
