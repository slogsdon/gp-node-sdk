import {
  Address,
  Credit,
  Customer,
  EmailReceipt,
  IRecurringEntity,
  IRecurringService,
  PaymentSchedule,
  RecurringBuilder,
  RecurringPaymentMethod,
  Schedule,
  StringUtils,
  TransactionType,
  UnsupportedTransactionError,
} from "../";
import { RestGateway } from "./RestGateway";

export class PayPlanConnector extends RestGateway implements IRecurringService {
  public supportsRetrieval = true;
  public supportsUpdatePaymentDetails = false;
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

  public processRecurring<T extends IRecurringEntity>(builder: RecurringBuilder<T>): Promise<T> {
    let request = new Object();
    // todo
    if (builder.transactionType === TransactionType.Create || builder.transactionType === TransactionType.Edit) {
      if (builder.entity instanceof Customer) {
        request = this.buildCustomer(request, builder.entity);
      }

      if (builder.entity instanceof RecurringPaymentMethod) {
        request = this.buildPaymentMethod(request, builder.entity, builder.transactionType);
      }

      if (builder.entity instanceof Schedule) {
        request = this.buildSchedule(request, builder.entity, builder.transactionType);
      }
    } else if (builder.transactionType === TransactionType.Search) {
      for (const entry in builder.searchCriteria) {
        if (builder.searchCriteria.hasOwnProperty(entry)) {
          (request as any)[entry] = builder.searchCriteria[entry];
        }
      }
    }

    return this.doTransaction(
        this.mapMethod(builder.transactionType),
        this.mapUrl(builder),
        JSON.stringify(request),
      )
      .then((response) => this.mapResponse<T>(builder, response));
  }

  protected mapResponse<T extends IRecurringEntity>(builder: RecurringBuilder<T>, rawResponse: string): T {
    if (!rawResponse) {
      return new Object() as T;
    }

    const response = JSON.parse(rawResponse);
    let result: any;

    if (builder.entity instanceof Customer && builder.transactionType === TransactionType.Search) {
      result = response.results.map((customer: object) => this.hydrateCustomer(customer));
    } else if (builder.entity instanceof Customer) {
      result = this.hydrateCustomer(response);
    }

    if (builder.entity instanceof RecurringPaymentMethod && builder.transactionType === TransactionType.Search) {
      result = response.results.map((paymentMethod: object) => this.hydrateRecurringPaymentMethod(paymentMethod));
    } else if (builder.entity instanceof RecurringPaymentMethod) {
      result = this.hydrateRecurringPaymentMethod(response);
    }

    if (builder.entity instanceof Schedule && builder.transactionType === TransactionType.Search) {
      result = response.results.map((schedule: object) => this.hydrateSchedule(schedule));
    } else if (builder.entity instanceof Schedule) {
      result = this.hydrateSchedule(response);
    }

    return result as T;
  }

  protected buildCustomer(request: any, entity: Customer) {
    if (entity) {
      request.customerIdentifier = entity.id;
      request.firstName = entity.firstName;
      request.lastName = entity.lastName;
      request.company = entity.company;
      request.customerStatus = entity.status;
      request.primaryEmail = entity.email;
      request.phoneDay = entity.homePhone;
      request.phoneEvening = entity.workPhone;
      request.phoneMobile = entity.mobilePhone;
      request.fax = entity.fax;
      request.title = entity.title;
      request.department = entity.department;
      request = this.buildAddress(request, entity.address);
    }

    return request;
  }

  protected buildPaymentMethod(request: any, _entity: RecurringPaymentMethod, _transactionType: TransactionType) {
    return request;
  }

  protected buildSchedule(request: any, _entity: Schedule, _transactionType: TransactionType) {
    return request;
  }

  protected buildAddress(request: any, address: Address) {
    if (address) {
      request.addressLine1 = address.streetAddress1;
      request.addressLine2 = address.streetAddress2;
      request.city = address.city;
      request.country = address.country;
      request.stateProvince = address.state;
      request.zipPostalCode = address.postalCode;
    }

    return request;
  }

  protected buildAmount(request: any, name: string, amount: number | string, currency: string, transactionType: TransactionType) {
    if (amount) {
      request[name] = {
        value: amount,
      } as any;
      if (transactionType === TransactionType.Create) {
        request[name].currency = currency;
      }
    }

    return request;
  }

  protected buildDate(request: any, name: string, date: Date, force = false) {
    const getDateValue = (d: Date) => {
      const day = StringUtils.leftPad(d.getUTCDate().toString(), 2, "0");
      const month = StringUtils.leftPad((d.getUTCMonth() + 1).toString(), 2, "0");
      const year = StringUtils.leftPad(d.getUTCFullYear().toString(), 4, "0");
      return month + day + year;
    };

    if (date || force) {
      const value = date ? getDateValue(date) : null;
      request[name] = value;
    }
    return request;
  }

  protected mapMethod(transactionType: TransactionType) {
    switch (transactionType) {
      case TransactionType.Create:
      case TransactionType.Search:
        return "POST";
      case TransactionType.Edit:
        return "PUT";
      case TransactionType.Delete:
        return "DELETE";
      default:
        return "GET";
    }
  }

  protected mapUrl<T extends IRecurringEntity>(builder: RecurringBuilder<T>) {
    let suffix = "";
    if (builder.transactionType === TransactionType.Fetch
      || builder.transactionType === TransactionType.Delete
      || builder.transactionType === TransactionType.Edit
    ) {
      suffix = "/" + builder.entity.key;
    }

    if (builder.entity instanceof Customer) {
      return (builder.transactionType === TransactionType.Search ? "searchCustomers" : "customers")
        + suffix;
    }

    if (builder.entity instanceof RecurringPaymentMethod) {
      let paymentMethod = "";
      if (builder.transactionType === TransactionType.Create) {
        paymentMethod = builder.entity.paymentMethod instanceof Credit ? "CreditCard" : "ACH";
      } else if (builder.transactionType === TransactionType.Edit) {
        paymentMethod = builder.entity.paymentType.replace(" ", "");

        return (builder.transactionType === TransactionType.Search ? "searchPaymentMethods" : "paymentMethods")
          + paymentMethod + suffix;
      }
    }

    if (builder.entity instanceof Schedule) {
      return (builder.transactionType === TransactionType.Search ? "searchSchedules" : "schedules")
        + suffix;
    }

    throw new UnsupportedTransactionError();
  }

  protected hydrateCustomer(response: any): Customer {
    const customer = new Customer();
    customer.key = response.customerKey;
    customer.id = response.customerIdentifier;
    customer.firstName = response.firstName;
    customer.lastName = response.lastName;
    customer.company = response.company;
    customer.status = response.customerStatus;
    customer.title = response.title;
    customer.department = response.department;
    customer.email = response.primaryEmail;
    customer.homePhone = response.phoneDay;
    customer.workPhone = response.phoneEvening;
    customer.mobilePhone = response.phoneMobile;
    customer.fax = response.fax;
    customer.address = new Address();
    customer.address.streetAddress1 = response.addressLine1;
    customer.address.streetAddress2 = response.addressLine2;
    customer.address.city = response.city;
    customer.address.province = response.stateProvince;
    customer.address.postalCode = response.zipPostalCode;
    customer.address.country = response.country;
    return customer;
  }

  protected hydrateRecurringPaymentMethod(response: any): RecurringPaymentMethod {
    const paymentMethod = new RecurringPaymentMethod();
    paymentMethod.key = response.paymentMethodKey;
    paymentMethod.paymentType = response.paymentMethodType;
    paymentMethod.preferredPayment = response.preferredPayment as boolean;
    paymentMethod.status = response.paymentStatus;
    paymentMethod.id = response.paymentMethodIdentifier;
    paymentMethod.customerKey = response.customerKey;
    paymentMethod.nameOnAccount = response.nameOnAccount;
    paymentMethod.commercialIndicator = response.cpcInd;
    paymentMethod.taxType = response.cpcTaxType;
    paymentMethod.expirationDate = response.expirationDate;
    paymentMethod.address = new Address();
    paymentMethod.address.streetAddress1 = response.addressLine1;
    paymentMethod.address.streetAddress2 = response.addressLine2;
    paymentMethod.address.city = response.city;
    paymentMethod.address.state = response.stateProvince;
    paymentMethod.address.postalCode = response.zipPostalCode;
    paymentMethod.address.country = response.country;
    return paymentMethod;
  }

  protected hydrateSchedule(response: any): Schedule {
    const schedule = new Schedule();
    schedule.key = response.scheduleKey;
    schedule.id = response.scheduleIdentifier;
    schedule.customerKey = response.customerKey;
    schedule.name = response.scheduleName;
    schedule.status = response.scheduleStatus;
    schedule.paymentKey = response.paymentMethodKey;

    if (response.subtotalAmount) {
      const subtotal = response.subtotalAmount;
      schedule.amount = subtotal.value;
      schedule.currency = subtotal.currency;
    }

    if (response.taxAmount) {
      const taxAmount = response.taxAmount;
      schedule.taxAmount = taxAmount.value;
    }

    schedule.deviceId = response.deviceId;
    schedule.startDate = new Date(response.startDate);
    schedule.paymentSchedule = ((value: string) => {
      switch (value.toString()) {
        case "Last":
          return PaymentSchedule.LastDayOfTheMonth;
        case "First":
          return PaymentSchedule.FirstDayOfTheMonth;
        default:
          return PaymentSchedule.Dynamic;
      }
    })(response.processingDateInfo);
    schedule.frequency = response.frequency;
    schedule.endDate = new Date(response.endDate);
    schedule.reprocessingCount = response.reprocessingCount;
    schedule.emailReceipt = ((value: string) => {
      switch (value.toString()) {
        default:
          return EmailReceipt.Never;
      }
    })(response.emailReceipt);
    schedule.emailNotification = ((value: string) => {
      if (!value) {
        return false;
      }
      return value.toString() === "No" ? false : true;
    })(response.emailNotification);
    // dept repay indicator
    schedule.invoiceNumber = response.invoiceNbr;
    schedule.poNumber = response.poNumber;
    schedule.description = response.description;
    // statusSetDate
    schedule.nextProcessingDate = new Date(response.nextProcessingDate);
    // previousProcessingDate
    // approvedTransactionCount
    // failureCount
    // totalApprovedAmountToDate
    // numberOfPaymentsRemaining
    schedule.cancellationDate = new Date(response.cancellationDate);
    // creationDate
    // lastChangeDate
    schedule.hasStarted = response.scheduleStarted as boolean;
    return schedule;
  }
}
