import {
  CData as cData,
  Element,
  Element as element,
  ElementTree,
  SubElement as subElement,
  XML as xml,
} from "@derflatulator/elementtree";

import {
  AuthorizationBuilder,
  CreditCardData,
  GenerationUtils,
  ManagementBuilder,
  StringUtils,
  Transaction,
  TransactionReference,
  TransactionType,
} from "../";
import { XmlGateway } from "./XmlGateway";

export class RealexConnector extends XmlGateway {
  public merchantId: string;
  public accountId: string;
  public sharedSecret: string;
  public channel: string;

  public processAuthorization(builder: AuthorizationBuilder): Promise<Transaction> {
    const timestamp = GenerationUtils.generateTimestamp();
    const orderId = builder.orderId ? builder.orderId : GenerationUtils.generateOrderId();

    // build Request
    const request = element("request", {
      timestamp,
      type: this.mapAuthRequestType(builder.transactionType),
    });
    if (this.merchantId) {
      subElement(request, "merchantid").append(cData(this.merchantId));
    }
    if (this.accountId) {
      subElement(request, "account").append(cData(this.accountId));
    }
    if (this.channel) {
      subElement(request, "channel").append(cData(this.channel));
    }
    subElement(request, "orderid").append(cData(orderId));
    const amountAttrs = builder.currency ? {currency: builder.currency} : {};
    subElement(request, "amount", amountAttrs).append(cData(builder.amount));

    // hydrate the payment data fields
    if (builder.paymentMethod instanceof CreditCardData) {
      const card = builder.paymentMethod;

      const cardElement = subElement(request, "card");
      subElement(cardElement, "number").append(cData(card.number));
      const date = StringUtils.leftPad(card.expMonth, 2, "0")
        + StringUtils.leftPad(card.expYear.substr(2, 2), 2, "0");
      subElement(cardElement, "expdate").append(cData(date));
      subElement(cardElement, "type").append(cData(card.getCardType().toUpperCase()));
      subElement(cardElement, "chname").append(cData(card.cardHolderName));

      if (card.cvn) {
          const cvnElement = subElement(cardElement, "cvn");
          subElement(cvnElement, "number").append(cData(card.cvn));
          subElement(cvnElement, "presind").append(cData(card.cvnPresenceIndicator.toString()));
      }
      // issueno

      subElement(request, "sha1hash").append(cData(this.generateHash(timestamp, orderId, builder.amount, builder.currency, card.number)));
    }

    // a TODO: This needs to be figured out based on txn type and set to 0, 1 or MULTI
    const autoSettle = builder.transactionType === TransactionType.Sale ? "1" : "0";
    subElement(request, "autosettle", {flag: autoSettle});

    // const comments = subElement(request, "comments");
    // subElement(comments, "comment", ""); // add id attribute

    // subElement(request, "pasref", transactionId);
    // subElement(request, "authcode", authCode);
    // a TODO: refundhash
    // a TODO: fraudfilter
    // a TODO: recurring

    // tssinfo
    // const tssInfo = subElement(request, "tssinfo");
    // subElement(tssInfo, "custnum", customerId);
    // subElement(tssInfo, "prodid", productId);
    // subElement(tssInfo, "constref", constref); // What is this used for?
    // subElement(tssInfo, "custipaddress", custIpAddress); // This should be fun...
    // subElement(tssInfo, "address", "");

    // a TODO: mpi
    // if (secureEcommerce != null) {
    //    const mpi = subElement(request, "mpi");
    //    subElement(mpi, "cavv");
    //    subElement(mpi, "xid");
    //    subElement(mpi, "eci");
    // }

    // subElement(request, "mobile");
    // subElement(request, "token", token);
    return new Promise((resolve, reject) => {
      this.doTransaction(this.buildEnvelope(request))
        .then((response) => resolve(this.mapResponse(response)))
        .catch(reject);
    });
  }

  public manageTransaction(builder: ManagementBuilder): Promise<Transaction> {
    const timestamp = GenerationUtils.generateTimestamp();
    const orderId = GenerationUtils.generateOrderId();

    // build Request
    const request = element("request", {
      timestamp,
      type: this.mapManageRequestType(builder.transactionType),
    });
    if (this.merchantId) {
      subElement(request, "merchantid").append(cData(this.merchantId));
    }
    if (this.accountId) {
      subElement(request, "account").append(cData(this.accountId));
    }
    if (this.channel) {
      subElement(request, "channel").append(cData(this.channel));
    }
    subElement(request, "orderid").append(cData(orderId));
    if (builder.paymentMethod) {
      const ref = builder.paymentMethod as TransactionReference;
      subElement(request, "pasref").append(cData(ref.transactionId));
    }

    if (builder.amount) {
      const amountAttrs = builder.currency ? {currency: builder.currency} : {};
      subElement(request, "amount", amountAttrs).append(cData(builder.amount));
    }

    // var comments = et.SubElement(request, "comments");
    // et.SubElement(comments, "comment", ""); // add id attribute

    subElement(request, "sha1hash").append(cData(this.generateHash(timestamp, orderId, builder.amount, builder.currency, "")));

    return new Promise((resolve, reject) => {
      this.doTransaction(this.buildEnvelope(request))
        .then((response) => resolve(this.mapResponse(response)))
        .catch(reject);
    });
  }

  protected buildEnvelope(transaction: Element): string {
    return new ElementTree(transaction).write();
  }

  protected mapResponse(rawResponse: string) {
    const result = new Transaction();
    const root = xml(rawResponse);

    result.responseCode = root.findtext(".//result");
    result.responseMessage = root.findtext(".//message");
    result.transactionReference = new TransactionReference(root.findtext(".//pasref"));

    return result;
  }

  protected generateHash(
    timestamp: string,
    orderId: string,
    amount: string,
    currency: string,
    paymentData: string,
    verify = false,
  ): string {
    const data = [
      timestamp,
      this.merchantId,
      orderId,
    ];

    if (false === verify) {
      data.push(amount);
      data.push(currency);
    }

    data.push(paymentData);

    return GenerationUtils.generateHash(data.join("."), this.sharedSecret);
  }

  protected mapAuthRequestType(type: TransactionType): string {
    switch (type) {
      case TransactionType.Sale:
      case TransactionType.Auth:
        return "auth";
      case TransactionType.Capture:
        return "settle";
      case TransactionType.Verify:
        return "otb";
      case TransactionType.Refund:
        return "credit";
      case TransactionType.Auth:
      case TransactionType.Sale:
        return "offline";
      case TransactionType.Reversal:
        // a TODO: should be customer type
        throw new Error(
          "The selected gateway does not support this transaction type.",
        );
      default:
        return "unknown";
    }
  }

  protected mapManageRequestType(type: TransactionType): string {
    switch (type) {
      case TransactionType.Capture:
        return "settle";
      case TransactionType.Refund:
        return "rebate";
      case TransactionType.Void:
      case TransactionType.Reversal:
        // a TODO: should be customer type
        return "void";
      default:
        return "unknown";
    }
  }
}
