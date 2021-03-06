"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require("../");
var TransactionBuilder_1 = require("./TransactionBuilder");
var AuthorizationBuilder = /** @class */ (function (_super) {
    __extends(AuthorizationBuilder, _super);
    function AuthorizationBuilder(type, paymentMethod) {
        var _this = _super.call(this, type, paymentMethod) || this;
        if (paymentMethod) {
            _this.paymentMethod = paymentMethod;
        }
        return _this;
    }
    /**
     * Executes the authorization builder against the gateway.
     *
     * @returns Promise<Transaction>
     */
    AuthorizationBuilder.prototype.execute = function () {
        _super.prototype.execute.call(this);
        return _1.ServicesContainer.instance()
            .getClient()
            .processAuthorization(this);
    };
    /**
     * Serializes an authorization builder for hosted payment page requests.
     *
     * Requires the gateway and account support hosted payment pages.
     *
     * @throws UnsupportedTransactionError Thrown when gateway doesn't support hosted payments
     * @returns string
     */
    AuthorizationBuilder.prototype.serialize = function () {
        this.transactionModifier = _1.TransactionModifier.HostedRequest;
        _super.prototype.execute.call(this);
        var client = _1.ServicesContainer.instance().getClient();
        if (client.supportsHostedPayments) {
            return client.serializeRequest(this);
        }
        throw new _1.UnsupportedTransactionError("Your current gateway does not support hosted payments");
    };
    AuthorizationBuilder.prototype.setupValidations = function () {
        this.validations
            .of("transactionType", 
        /* tslint:disable:trailing-comma */
        _1.TransactionType.Auth |
            _1.TransactionType.Sale |
            _1.TransactionType.Refund |
            _1.TransactionType.AddValue)
            .with("transactionModifier", _1.TransactionModifier.None)
            .check("amount")
            .isNotNull()
            .check("currency")
            .isNotNull()
            .check("paymentMethod")
            .isNotNull();
        this.validations
            .of("transactionType", 
        /* tslint:disable:trailing-comma */
        _1.TransactionType.Auth | _1.TransactionType.Sale | _1.TransactionType.Verify)
            .with("transactionModifier", _1.TransactionModifier.HostedRequest)
            .check("amount")
            .isNotNull()
            .check("currency")
            .isNotNull();
        this.validations
            .of("transactionType", 
        /* tslint:disable:trailing-comma */
        _1.TransactionType.Auth | _1.TransactionType.Sale)
            .with("transactionModifier", _1.TransactionModifier.Offline)
            .check("amount")
            .isNotNull()
            .check("currency")
            .isNotNull()
            .check("offlineAuthCode")
            .isNotNull()
            .check("offlineAuthCode")
            .isNotEmpty();
        this.validations
            .of("transactionType", _1.TransactionType.Auth | _1.TransactionType.Sale)
            .with("transactionModifier", _1.TransactionModifier.EncryptedMobile)
            .check("paymentMethod")
            .isNotNull()
            .check("paymentMethod")
            .isNotEmpty();
        this.validations
            .of("transactionType", _1.TransactionType.BenefitWithDrawal)
            .with("transactionModifier", _1.TransactionModifier.CashBack)
            .check("amount")
            .isNotNull()
            .check("currency")
            .isNotNull()
            .check("paymentMethod")
            .isNotNull();
        this.validations
            .of("transactionType", _1.TransactionType.Balance)
            .check("paymentMethod")
            .isNotNull();
        this.validations
            .of("transactionType", _1.TransactionType.Alias)
            .check("aliasAction")
            .isNotNull()
            .check("alias")
            .isNotNull();
        this.validations
            .of("transactionType", _1.TransactionType.Replace)
            .check("replacementCard")
            .isNotNull();
        this.validations
            .of("paymentMethodType", _1.PaymentMethodType.ACH)
            .check("billingAddress")
            .isNotNull();
    };
    /**
     * Sets an address value; where applicable.
     *
     * Currently supports billing and shipping addresses.
     *
     * @param address The desired address information
     * @param addressType The desired address type
     * @returns AuthorizationBuilder
     */
    AuthorizationBuilder.prototype.withAddress = function (address, addressType) {
        if (addressType === void 0) { addressType = _1.AddressType.Billing; }
        if (address === undefined) {
            return this;
        }
        address.type = addressType;
        if (addressType === _1.AddressType.Billing) {
            this.billingAddress = address;
        }
        else {
            this.shippingAddress = address;
        }
        return this;
    };
    AuthorizationBuilder.prototype.withAlias = function (aliasAction, alias) {
        if (alias !== undefined) {
            this.alias = alias;
        }
        this.aliasAction = aliasAction;
        return this;
    };
    /**
     * Allows duplicate transactions by skipping the
     * gateway's duplicate checking.
     *
     * @param allowDuplicates The duplicate skip flag
     * @returns AuthorizationBuilder
     */
    AuthorizationBuilder.prototype.withAllowDuplicates = function (allowDuplicates) {
        if (allowDuplicates !== undefined) {
            this.allowDuplicates = allowDuplicates;
        }
        return this;
    };
    /**
     * Allows partial authorizations to occur.
     *
     *
     * @param allowPartialAuth The allow partial flag
     * @returns AuthorizationBuilder
     */
    AuthorizationBuilder.prototype.withAllowPartialAuth = function (allowPartialAuth) {
        if (allowPartialAuth !== undefined) {
            this.allowPartialAuth = allowPartialAuth;
        }
        return this;
    };
    /**
     * Sets the transaction's amount
     *
     * @param amount The amount
     * @returns AuthorizationBuilder
     */
    AuthorizationBuilder.prototype.withAmount = function (amount) {
        if (amount !== undefined) {
            this.amount = amount;
        }
        return this;
    };
    /**
     * Sets the transaction's authorization amount; where applicable.
     *
     * This is a specialized field. In most cases,
     * `Authorization.withAmount` should be used.
     *
     * @param authAmount The authorization amount
     * @returns AuthorizationBuilder
     */
    AuthorizationBuilder.prototype.withAuthAmount = function (authAmount) {
        if (authAmount !== undefined) {
            this.authAmount = authAmount;
        }
        return this;
    };
    AuthorizationBuilder.prototype.withBalanceInquiryType = function (inquiry) {
        if (inquiry !== undefined) {
            this.balanceInquiryType = inquiry;
        }
        return this;
    };
    /**
     * Sets the cash back amount.
     *
     * This is a specialized field for debit or EBT transactions.
     *
     * @param amount The desired cash back amount
     * @returns AuthorizationBuilder
     */
    AuthorizationBuilder.prototype.withCashBack = function (amount) {
        if (amount !== undefined) {
            this.cashBackAmount = amount;
            this.transactionModifier = _1.TransactionModifier.CashBack;
        }
        return this;
    };
    /**
     * Sets the client transaction ID.
     *
     * This is an application derived value that can be used to identify a
     * transaction in case a gateway transaction ID is not returned, e.g.
     * in cases of timeouts.
     *
     * The supplied value should be unique to the configured merchant or
     * terminal account.
     *
     * @param clientTransactionId The client transaction ID
     * @returns AuthorizationBuilder
     */
    AuthorizationBuilder.prototype.withClientTransactionId = function (clientTransactionId) {
        if (clientTransactionId === undefined) {
            return this;
        }
        if (this.transactionType !== _1.TransactionType.Reversal &&
            this.transactionType !== _1.TransactionType.Refund) {
            this.clientTransactionId = clientTransactionId;
            return this;
        }
        if (!(this.paymentMethod instanceof _1.TransactionReference)) {
            this.paymentMethod = new _1.TransactionReference();
        }
        this
            .paymentMethod.clientTransactionId = clientTransactionId;
        return this;
    };
    /**
     * Sets the transaction's currency; where applicable.
     *
     * The formatting for the supplied value will currently depend on
     * the configured gateway's requirements.
     *
     * @param currency The currency
     * @returns AuthorizationBuilder
     */
    AuthorizationBuilder.prototype.withCurrency = function (currency) {
        if (currency !== undefined) {
            this.currency = currency;
        }
        return this;
    };
    /**
     * Sets the customer ID; where applicable.
     *
     * This is an application/merchant generated value.
     *
     * @param customerId The customer ID
     * @returns AuthorizationBuilder
     */
    AuthorizationBuilder.prototype.withCustomerId = function (customerId) {
        if (customerId !== undefined) {
            this.customerId = customerId;
        }
        return this;
    };
    /**
     * Sets the customer's IP address; where applicable.
     *
     * This value should be obtained during the payment process.
     *
     * @param customerIpAddress The customer's IP address
     * @returns AuthorizationBuilder
     */
    AuthorizationBuilder.prototype.withCustomerIpAddress = function (customerIpAddress) {
        if (customerIpAddress !== undefined) {
            this.customerIpAddress = customerIpAddress;
        }
        return this;
    };
    /**
     * Sets the CVN value for recurring payments; where applicable.
     *
     * @param cvn CVN value to use in the request
     * @returns AuthorizationBuilder
     */
    AuthorizationBuilder.prototype.withCvn = function (cvn) {
        if (cvn !== undefined) {
            this.cvn = cvn;
        }
        return this;
    };
    /**
     * Sets the transaction's description.
     *
     * This value is not guaranteed to be sent in the authorization
     * or settlement process.
     *
     * @param description The description
     * @returns AuthorizationBuilder
     */
    AuthorizationBuilder.prototype.withDescription = function (description) {
        if (description !== undefined) {
            this.description = description;
        }
        return this;
    };
    /**
     * Sets the transaction's dynamic descriptor.
     *
     * This value is sent during the authorization process and is displayed
     * in the consumer's account.
     *
     * @param dynamicDescriptor The dynamic descriptor
     * @returns AuthorizationBuilder
     */
    AuthorizationBuilder.prototype.withDynamicDescriptor = function (dynamicDescriptor) {
        if (dynamicDescriptor !== undefined) {
            this.dynamicDescriptor = dynamicDescriptor;
        }
        return this;
    };
    /**
     * Sets eCommerce specific data; where applicable.
     *
     * This can include:
     *
     *   - Consumer authentication (3DSecure) data
     *   - Direct market data
     *
     * @param ecommerceInfo The eCommerce data
     * @returns AuthorizationBuilder
     */
    AuthorizationBuilder.prototype.withEcommerceInfo = function (ecommerceInfo) {
        if (ecommerceInfo !== undefined) {
            this.ecommerceInfo = ecommerceInfo;
        }
        return this;
    };
    /**
     * Sets the gratuity amount; where applicable.
     *
     * This value is information only and does not affect
     * the authorization amount.
     *
     * @param gratuity The gratuity amount
     * @returns AuthorizationBuilder
     */
    AuthorizationBuilder.prototype.withGratuity = function (gratuity) {
        if (gratuity !== undefined) {
            this.gratuity = gratuity;
        }
        return this;
    };
    /**
     * Sets the Convenience amount; where applicable.
     *
     * @param convenienceAmt The Convenience amount
     * @returns AuthorizationBuilder
     */
    AuthorizationBuilder.prototype.withConvenienceAmt = function (convenienceAmt) {
        if (convenienceAmt !== undefined) {
            this.convenienceAmt = convenienceAmt;
        }
        return this;
    };
    /**
     * Sets the Shipping amount; where applicable.
     *
     * @param shippingAmt The Shipping amount
     * @returns AuthorizationBuilder
     */
    AuthorizationBuilder.prototype.withShippingAmt = function (shippingAmt) {
        if (shippingAmt !== undefined) {
            this.shippingAmt = shippingAmt;
        }
        return this;
    };
    /**
     * Additional hosted payment specific information for Realex HPP implementation.
     *
     * @param hostedPaymentData The hosted payment data
     * @returns AuthorizationBuilder
     */
    AuthorizationBuilder.prototype.withHostedPaymentData = function (hostedPaymentData) {
        var client = _1.ServicesContainer.instance().getClient();
        if (!client.supportsHostedPayments) {
            throw new _1.UnsupportedTransactionError("Your current gateway does not support hosted payments.");
        }
        if (hostedPaymentData !== undefined) {
            this.hostedPaymentData = hostedPaymentData;
        }
        return this;
    };
    /**
     * Sets the invoice number; where applicable.
     *
     * @param invoiceNumber The invoice number
     * @returns AuthorizationBuilder
     */
    AuthorizationBuilder.prototype.withInvoiceNumber = function (invoiceNumber) {
        if (invoiceNumber !== undefined) {
            this.invoiceNumber = invoiceNumber;
        }
        return this;
    };
    /**
     * Sets the commercial request flag; where applicable.
     *
     * This flag indicates commercial purchase cards are accepted/expected.
     * The application should inspect the transaction response and pass the
     * appropriate Level II data when necessary.
     *
     * @param level2Request The commercial request flag
     * @returns AuthorizationBuilder
     */
    AuthorizationBuilder.prototype.withCommercialRequest = function (level2Request) {
        if (level2Request !== undefined) {
            this.level2Request = level2Request;
        }
        return this;
    };
    /**
     * Sets the offline authorization code; where applicable.
     *
     * The merchant is required to supply this value as obtained when
     * calling the issuing bank for the authorization.
     *
     * @param offlineAuthCode The offline authorization code
     * @returns AuthorizationBuilder
     */
    AuthorizationBuilder.prototype.withOfflineAuthCode = function (offlineAuthCode) {
        if (offlineAuthCode !== undefined) {
            this.offlineAuthCode = offlineAuthCode;
            this.transactionModifier = _1.TransactionModifier.Offline;
        }
        return this;
    };
    /**
     * Sets the one-time payment flag; where applicable.
     *
     * This is only useful when using recurring payment profiles for
     * one-time payments that are not a part of a recurring schedule.
     *
     * @param oneTimePayment The one-time flag
     * @returns AuthorizationBuilder
     */
    AuthorizationBuilder.prototype.withOneTimePayment = function (oneTimePayment) {
        if (oneTimePayment !== undefined) {
            this.oneTimePayment = oneTimePayment;
            this.transactionModifier = _1.TransactionModifier.Recurring;
        }
        return this;
    };
    /**
     * Sets the transaction's order ID; where applicable.
     *
     * @param orderId The order ID
     * @returns AuthorizationBuilder
     */
    AuthorizationBuilder.prototype.withOrderId = function (orderId) {
        if (orderId !== undefined) {
            this.orderId = orderId;
        }
        return this;
    };
    /**
     * Sets the transaction's product ID; where applicable.
     *
     * @param productId The product ID
     * @returns AuthorizationBuilder
     */
    AuthorizationBuilder.prototype.withProductId = function (productId) {
        if (productId !== undefined) {
            this.productId = productId;
        }
        return this;
    };
    /**
     * Sets the Recurring Info for Realex based recurring payments;
     * where applicable.
     *
     * @param type The value can be 'fixed' or 'variable' depending on whether
     *             the amount will change for each transaction.
     * @param sequence  Indicates where in the recurring sequence the transaction
     *                  occurs. Must be 'first' for the first transaction for this
     *                  card, 'subsequent' for transactions after that, and 'last'
     *                  for the final transaction of the set.
     * @returns AuthorizationBuilder
     */
    AuthorizationBuilder.prototype.withRecurringInfo = function (type, sequence) {
        if (type !== undefined) {
            this.recurringType = type;
        }
        if (sequence !== undefined) {
            this.recurringSequence = sequence;
        }
        return this;
    };
    /**
     * Requests multi-use tokenization / card storage.
     *
     * This will depend on a successful transaction. If there was a failure
     * or decline, the multi-use tokenization / card storage will not be
     * successful.
     *
     * @param requestMultiUseToken The request flag
     * @returns AuthorizationBuilder
     */
    AuthorizationBuilder.prototype.withRequestMultiUseToken = function (requestMultiUseToken) {
        if (requestMultiUseToken !== undefined) {
            this.requestMultiUseToken = requestMultiUseToken;
        }
        return this;
    };
    AuthorizationBuilder.prototype.withReplacementCard = function (replacementCard) {
        if (replacementCard !== undefined) {
            this.replacementCard = replacementCard;
        }
        return this;
    };
    /**
     * Sets the schedule ID associated with the transaction; where applicable.
     *
     * This is specific to transactions against recurring profiles that are
     * a part of a recurring schedule.
     *
     * @param scheduleId The schedule ID
     * @returns AuthorizationBuilder
     */
    AuthorizationBuilder.prototype.withScheduleId = function (scheduleId) {
        if (scheduleId !== undefined) {
            this.scheduleId = scheduleId;
        }
        return this;
    };
    /**
     * Sets the related gateway transaction ID; where applicable.
     *
     * This value is used to associated a previous transaction with the
     * current transaction.
     *
     * @param transactionId The gateway transaction ID
     * @returns AuthorizationBuilder
     */
    AuthorizationBuilder.prototype.withTransactionId = function (transactionId) {
        if (transactionId === undefined) {
            return this;
        }
        if (this.paymentMethod instanceof _1.TransactionReference) {
            this.paymentMethod.transactionId = transactionId;
            return this;
        }
        return this.withPaymentMethod(new _1.TransactionReference(transactionId));
    };
    AuthorizationBuilder.prototype.withTimestamp = function (timestamp) {
        if (timestamp !== undefined) {
            this.timestamp = timestamp;
        }
        return this;
    };
    return AuthorizationBuilder;
}(TransactionBuilder_1.TransactionBuilder));
exports.AuthorizationBuilder = AuthorizationBuilder;
