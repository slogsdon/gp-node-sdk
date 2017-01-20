import {
  PorticoConnector,
  RealexConnector,
} from "./Gateways";
import { IGateway } from "./Gateways/IGateway";
import { ServicesConfig } from "./ServicesConfig";

export class ServicesContainer {
  private static _instance: ServicesContainer;
  private _gateway: IGateway;

  public static instance(): ServicesContainer {
    if (ServicesContainer._instance === null) {
      ServicesContainer._instance = new ServicesContainer();
    }

    return ServicesContainer._instance;
  }

  public static configure(config: ServicesConfig): void {
    config.validate();

    let gateway: IGateway;
    if (config.merchantId && config.merchantId !== "") {
        gateway = new RealexConnector();
        gateway.merchantId = config.merchantId;
        gateway.sharedSecret = config.sharedSecret;
        gateway.accountId = config.accountId;
        gateway.channel = config.channel;
        gateway.timeout = config.timeout;
        gateway.serviceUrl = config.serviceUrl;
    } else {
        gateway = new PorticoConnector();
        gateway.siteId = config.siteId;
        gateway.licenseId = config.licenseId;
        gateway.deviceId = config.deviceId;
        gateway.username = config.username;
        gateway.password = config.password;
        gateway.secretApiKey = config.secretApiKey;
        gateway.developerId = config.developerId;
        gateway.versionNumber = config.versionNumber;
        gateway.timeout = config.timeout;
        gateway.serviceUrl = config.serviceUrl;
    }

    ServicesContainer._instance = new ServicesContainer(gateway);
  }

  public constructor(gateway?: IGateway) {
    if (gateway) {
      this._gateway = gateway;
    }
  }

  public getClient(): IGateway {
    return this._gateway;
  }
}
