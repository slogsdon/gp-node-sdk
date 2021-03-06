"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = require("ava");
var _1 = require("../../../../../src/");
var throttle = function () { return new Promise(function (resolve) { return setTimeout(resolve, 1500); }); };
ava_1.default.beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, throttle()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Validation_002a", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                config.channel = "ECOM";
                _1.ServicesContainer.configure(config);
                billingAddress = new _1.Address();
                billingAddress.postalCode = "779|102";
                billingAddress.country = "GB";
                shippingAddress = new _1.Address();
                shippingAddress.postalCode = "658|325";
                shippingAddress.country = "FR";
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerId("100")
                        .withProductId("999")
                        .withClientTransactionId("test")
                        .withCustomerIpAddress("123.123.123.123")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-Validation-002a")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Validation_002b", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                config.channel = "ECOM";
                _1.ServicesContainer.configure(config);
                billingAddress = new _1.Address();
                billingAddress.postalCode = "779|102";
                billingAddress.country = "GB";
                shippingAddress = new _1.Address();
                shippingAddress.postalCode = "658|325";
                shippingAddress.country = "FR";
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerId("100")
                        .withProductId("999")
                        .withClientTransactionId("test")
                        .withCustomerIpAddress("123.123.123.123")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-Validation-002b")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Validation_002c1", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                config.channel = "ECOM";
                _1.ServicesContainer.configure(config);
                billingAddress = new _1.Address();
                billingAddress.postalCode = "779|102";
                billingAddress.country = "GB";
                shippingAddress = new _1.Address();
                shippingAddress.postalCode = "658|325";
                shippingAddress.country = "FR";
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerId("100")
                        .withProductId("999")
                        .withClientTransactionId("test")
                        .withCustomerIpAddress("123.123.123.123")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-Validation-002c1")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Validation_002c2", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                config.channel = "ECOM";
                _1.ServicesContainer.configure(config);
                billingAddress = new _1.Address();
                billingAddress.postalCode = "779|102";
                billingAddress.country = "GB";
                shippingAddress = new _1.Address();
                shippingAddress.postalCode = "658|325";
                shippingAddress.country = "FR";
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerId("100")
                        .withProductId("999")
                        .withClientTransactionId("test")
                        .withCustomerIpAddress("123.123.123.123")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-Validation-002c2")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Validation_002d", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                config.channel = "ECOM";
                _1.ServicesContainer.configure(config);
                billingAddress = new _1.Address();
                billingAddress.postalCode = "779|102";
                billingAddress.country = "GB";
                shippingAddress = new _1.Address();
                shippingAddress.postalCode = "658|325";
                shippingAddress.country = "FR";
                card = new _1.CreditCardData();
                card.number = "V002625938386848";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerId("100")
                        .withProductId("999")
                        .withClientTransactionId("test")
                        .withCustomerIpAddress("123.123.123.123")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-Validation-002d")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Validation_002e", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                config.channel = "ECOM";
                _1.ServicesContainer.configure(config);
                billingAddress = new _1.Address();
                billingAddress.postalCode = "779|102";
                billingAddress.country = "GB";
                shippingAddress = new _1.Address();
                shippingAddress.postalCode = "658|325";
                shippingAddress.country = "FR";
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerId("100")
                        .withProductId("999")
                        .withClientTransactionId("test")
                        .withCustomerIpAddress("123.123.123.123")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-Validation-002e")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Validation_002f", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                config.channel = "ECOM";
                _1.ServicesContainer.configure(config);
                billingAddress = new _1.Address();
                billingAddress.postalCode = "779|102";
                billingAddress.country = "GB";
                shippingAddress = new _1.Address();
                shippingAddress.postalCode = "658|325";
                shippingAddress.country = "FR";
                card = new _1.CreditCardData();
                card.number = " 4002 6259 3838 6848";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerId("100")
                        .withProductId("999")
                        .withClientTransactionId("test")
                        .withCustomerIpAddress("123.123.123.123")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-Validation-002f")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Validation_002g", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                config.channel = "ECOM";
                _1.ServicesContainer.configure(config);
                billingAddress = new _1.Address();
                billingAddress.postalCode = "779|102";
                billingAddress.country = "GB";
                shippingAddress = new _1.Address();
                shippingAddress.postalCode = "658|325";
                shippingAddress.country = "FR";
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerId("100")
                        .withProductId("999")
                        .withClientTransactionId("test")
                        .withCustomerIpAddress("123.123.123.123")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-Validation-002g")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Validation_002h", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                config.channel = "ECOM";
                _1.ServicesContainer.configure(config);
                billingAddress = new _1.Address();
                billingAddress.postalCode = "779|102";
                billingAddress.country = "GB";
                shippingAddress = new _1.Address();
                shippingAddress.postalCode = "658|325";
                shippingAddress.country = "FR";
                card = new _1.CreditCardData();
                card.number = "";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerId("100")
                        .withProductId("999")
                        .withClientTransactionId("test")
                        .withCustomerIpAddress("123.123.123.123")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-Validation-002h")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Validation_003a", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                config.channel = "ECOM";
                _1.ServicesContainer.configure(config);
                billingAddress = new _1.Address();
                billingAddress.postalCode = "779|102";
                billingAddress.country = "GB";
                shippingAddress = new _1.Address();
                shippingAddress.postalCode = "658|325";
                shippingAddress.country = "FR";
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerId("100")
                        .withProductId("999")
                        .withClientTransactionId("test")
                        .withCustomerIpAddress("123.123.123.123")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-Validation-003a")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Validation_003b", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                config.channel = "ECOM";
                _1.ServicesContainer.configure(config);
                billingAddress = new _1.Address();
                billingAddress.postalCode = "779|102";
                billingAddress.country = "GB";
                shippingAddress = new _1.Address();
                shippingAddress.postalCode = "658|325";
                shippingAddress.country = "FR";
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerId("100")
                        .withProductId("999")
                        .withClientTransactionId("test")
                        .withCustomerIpAddress("123.123.123.123")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-Validation-003b")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Validation_003c", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                config.channel = "ECOM";
                _1.ServicesContainer.configure(config);
                billingAddress = new _1.Address();
                billingAddress.postalCode = "779|102";
                billingAddress.country = "GB";
                shippingAddress = new _1.Address();
                shippingAddress.postalCode = "658|325";
                shippingAddress.country = "FR";
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "20";
                card.expYear = "2012";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerId("100")
                        .withProductId("999")
                        .withClientTransactionId("test")
                        .withCustomerIpAddress("123.123.123.123")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-Validation-003c")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Validation_003d", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                config.channel = "ECOM";
                _1.ServicesContainer.configure(config);
                billingAddress = new _1.Address();
                billingAddress.postalCode = "779|102";
                billingAddress.country = "GB";
                shippingAddress = new _1.Address();
                shippingAddress.postalCode = "658|325";
                shippingAddress.country = "FR";
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2015";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerId("100")
                        .withProductId("999")
                        .withClientTransactionId("test")
                        .withCustomerIpAddress("123.123.123.123")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-Validation-003d")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Validation_003e", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                config.channel = "ECOM";
                _1.ServicesContainer.configure(config);
                billingAddress = new _1.Address();
                billingAddress.postalCode = "779|102";
                billingAddress.country = "GB";
                shippingAddress = new _1.Address();
                shippingAddress.postalCode = "658|325";
                shippingAddress.country = "FR";
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "11";
                card.expYear = "5";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerId("100")
                        .withProductId("999")
                        .withClientTransactionId("test")
                        .withCustomerIpAddress("123.123.123.123")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-Validation-003e")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Validation_003f", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                config.channel = "ECOM";
                _1.ServicesContainer.configure(config);
                billingAddress = new _1.Address();
                billingAddress.postalCode = "779|102";
                billingAddress.country = "GB";
                shippingAddress = new _1.Address();
                shippingAddress.postalCode = "658|325";
                shippingAddress.country = "FR";
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerId("100")
                        .withProductId("999")
                        .withClientTransactionId("test")
                        .withCustomerIpAddress("123.123.123.123")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-Validation-003f")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Validation_003g", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                config.channel = "ECOM";
                _1.ServicesContainer.configure(config);
                billingAddress = new _1.Address();
                billingAddress.postalCode = "779|102";
                billingAddress.country = "GB";
                shippingAddress = new _1.Address();
                shippingAddress.postalCode = "658|325";
                shippingAddress.country = "FR";
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "20";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerId("100")
                        .withProductId("999")
                        .withClientTransactionId("test")
                        .withCustomerIpAddress("123.123.123.123")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-Validation-003g")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Validation_003h", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                config.channel = "ECOM";
                _1.ServicesContainer.configure(config);
                billingAddress = new _1.Address();
                billingAddress.postalCode = "779|102";
                billingAddress.country = "GB";
                shippingAddress = new _1.Address();
                shippingAddress.postalCode = "658|325";
                shippingAddress.country = "FR";
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerId("100")
                        .withProductId("999")
                        .withClientTransactionId("test")
                        .withCustomerIpAddress("123.123.123.123")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-Validation-003h")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Validation_003i", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                config.channel = "ECOM";
                _1.ServicesContainer.configure(config);
                billingAddress = new _1.Address();
                billingAddress.postalCode = "779|102";
                billingAddress.country = "GB";
                shippingAddress = new _1.Address();
                shippingAddress.postalCode = "658|325";
                shippingAddress.country = "FR";
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerId("100")
                        .withProductId("999")
                        .withClientTransactionId("test")
                        .withCustomerIpAddress("123.123.123.123")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-Validation-003i")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Validation_004a", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                config.channel = "ECOM";
                _1.ServicesContainer.configure(config);
                billingAddress = new _1.Address();
                billingAddress.postalCode = "779|102";
                billingAddress.country = "GB";
                shippingAddress = new _1.Address();
                shippingAddress.postalCode = "658|325";
                shippingAddress.country = "FR";
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerId("100")
                        .withProductId("999")
                        .withClientTransactionId("test")
                        .withCustomerIpAddress("123.123.123.123")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-Validation-004a")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Validation_004b", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                config.channel = "ECOM";
                _1.ServicesContainer.configure(config);
                billingAddress = new _1.Address();
                billingAddress.postalCode = "779|102";
                billingAddress.country = "GB";
                shippingAddress = new _1.Address();
                shippingAddress.postalCode = "658|325";
                shippingAddress.country = "FR";
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "1234";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerId("100")
                        .withProductId("999")
                        .withClientTransactionId("test")
                        .withCustomerIpAddress("123.123.123.123")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-Validation-004b")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Validation_004c", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                config.channel = "ECOM";
                _1.ServicesContainer.configure(config);
                billingAddress = new _1.Address();
                billingAddress.postalCode = "779|102";
                billingAddress.country = "GB";
                shippingAddress = new _1.Address();
                shippingAddress.postalCode = "658|325";
                shippingAddress.country = "FR";
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "12345";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerId("100")
                        .withProductId("999")
                        .withClientTransactionId("test")
                        .withCustomerIpAddress("123.123.123.123")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-Validation-004c")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Validation_004d", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                config.channel = "ECOM";
                _1.ServicesContainer.configure(config);
                billingAddress = new _1.Address();
                billingAddress.postalCode = "779|102";
                billingAddress.country = "GB";
                shippingAddress = new _1.Address();
                shippingAddress.postalCode = "658|325";
                shippingAddress.country = "FR";
                card = new _1.CreditCardData();
                card.number = "374101000000608";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "1234";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerId("100")
                        .withProductId("999")
                        .withClientTransactionId("test")
                        .withCustomerIpAddress("123.123.123.123")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-Validation-004d")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Validation_004e", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                config.channel = "ECOM";
                _1.ServicesContainer.configure(config);
                billingAddress = new _1.Address();
                billingAddress.postalCode = "779|102";
                billingAddress.country = "GB";
                shippingAddress = new _1.Address();
                shippingAddress.postalCode = "658|325";
                shippingAddress.country = "FR";
                card = new _1.CreditCardData();
                card.number = "374101000000608";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerId("100")
                        .withProductId("999")
                        .withClientTransactionId("test")
                        .withCustomerIpAddress("123.123.123.123")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-Validation-004e")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Validation_004f", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                config.channel = "ECOM";
                _1.ServicesContainer.configure(config);
                billingAddress = new _1.Address();
                billingAddress.postalCode = "779|102";
                billingAddress.country = "GB";
                shippingAddress = new _1.Address();
                shippingAddress.postalCode = "658|325";
                shippingAddress.country = "FR";
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = 0;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerId("100")
                        .withProductId("999")
                        .withClientTransactionId("test")
                        .withCustomerIpAddress("123.123.123.123")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-Validation-004f")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Validation_004g", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                config.channel = "ECOM";
                _1.ServicesContainer.configure(config);
                billingAddress = new _1.Address();
                billingAddress.postalCode = "779|102";
                billingAddress.country = "GB";
                shippingAddress = new _1.Address();
                shippingAddress.postalCode = "658|325";
                shippingAddress.country = "FR";
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Illegible;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerId("100")
                        .withProductId("999")
                        .withClientTransactionId("test")
                        .withCustomerIpAddress("123.123.123.123")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-Validation-004g")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Validation_004h", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                config.channel = "ECOM";
                _1.ServicesContainer.configure(config);
                billingAddress = new _1.Address();
                billingAddress.postalCode = "779|102";
                billingAddress.country = "GB";
                shippingAddress = new _1.Address();
                shippingAddress.postalCode = "658|325";
                shippingAddress.country = "FR";
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.NotOnCard;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerId("100")
                        .withProductId("999")
                        .withClientTransactionId("test")
                        .withCustomerIpAddress("123.123.123.123")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-Validation-004h")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Validation_004i", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                config.channel = "ECOM";
                _1.ServicesContainer.configure(config);
                billingAddress = new _1.Address();
                billingAddress.postalCode = "779|102";
                billingAddress.country = "GB";
                shippingAddress = new _1.Address();
                shippingAddress.postalCode = "658|325";
                shippingAddress.country = "FR";
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.NotRequested;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerId("100")
                        .withProductId("999")
                        .withClientTransactionId("test")
                        .withCustomerIpAddress("123.123.123.123")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-Validation-004i")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Validation_005a", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                config.channel = "ECOM";
                _1.ServicesContainer.configure(config);
                billingAddress = new _1.Address();
                billingAddress.postalCode = "779|102";
                billingAddress.country = "GB";
                shippingAddress = new _1.Address();
                shippingAddress.postalCode = "658|325";
                shippingAddress.country = "FR";
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2015";
                card.cvn = "1234";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerId("100")
                        .withProductId("999")
                        .withClientTransactionId("test")
                        .withCustomerIpAddress("123.123.123.123")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-Validation-005a")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Validation_005b", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                config.channel = "ECOM";
                _1.ServicesContainer.configure(config);
                billingAddress = new _1.Address();
                billingAddress.postalCode = "779|102";
                billingAddress.country = "GB";
                shippingAddress = new _1.Address();
                shippingAddress.postalCode = "658|325";
                shippingAddress.country = "FR";
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerId("100")
                        .withProductId("999")
                        .withClientTransactionId("test")
                        .withCustomerIpAddress("123.123.123.123")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-Validation-005b")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Validation_005c", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                config.channel = "ECOM";
                _1.ServicesContainer.configure(config);
                billingAddress = new _1.Address();
                billingAddress.postalCode = "779|102";
                billingAddress.country = "GB";
                shippingAddress = new _1.Address();
                shippingAddress.postalCode = "658|325";
                shippingAddress.country = "FR";
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "1234";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerId("100")
                        .withProductId("999")
                        .withClientTransactionId("test")
                        .withCustomerIpAddress("123.123.123.123")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-Validation-005c")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Validation_005d", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                config.channel = "ECOM";
                _1.ServicesContainer.configure(config);
                billingAddress = new _1.Address();
                billingAddress.postalCode = "779|102";
                billingAddress.country = "GB";
                shippingAddress = new _1.Address();
                shippingAddress.postalCode = "658|325";
                shippingAddress.country = "FR";
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2015";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerId("100")
                        .withProductId("999")
                        .withClientTransactionId("test")
                        .withCustomerIpAddress("123.123.123.123")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-Validation-005d")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Validation_005e", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                config.channel = "ECOM";
                _1.ServicesContainer.configure(config);
                billingAddress = new _1.Address();
                billingAddress.postalCode = "779|102";
                billingAddress.country = "GB";
                shippingAddress = new _1.Address();
                shippingAddress.postalCode = "658|325";
                shippingAddress.country = "FR";
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2015";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerId("100")
                        .withProductId("999")
                        .withClientTransactionId("test")
                        .withCustomerIpAddress("123.123.123.123")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-Validation-005e")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Validation_005f", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                config.channel = "ECOM";
                _1.ServicesContainer.configure(config);
                billingAddress = new _1.Address();
                billingAddress.postalCode = "779|102";
                billingAddress.country = "GB";
                shippingAddress = new _1.Address();
                shippingAddress.postalCode = "658|325";
                shippingAddress.country = "FR";
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2015";
                card.cvn = "1234";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerId("100")
                        .withProductId("999")
                        .withClientTransactionId("test")
                        .withCustomerIpAddress("123.123.123.123")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-Validation-005f")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Validation_005g", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                config.channel = "ECOM";
                _1.ServicesContainer.configure(config);
                billingAddress = new _1.Address();
                billingAddress.postalCode = "779|102";
                billingAddress.country = "GB";
                shippingAddress = new _1.Address();
                shippingAddress.postalCode = "658|325";
                shippingAddress.country = "FR";
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2015";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerId("100")
                        .withProductId("999")
                        .withClientTransactionId("test")
                        .withCustomerIpAddress("123.123.123.123")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-Validation-005g")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Validation_005h", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                config.channel = "ECOM";
                _1.ServicesContainer.configure(config);
                billingAddress = new _1.Address();
                billingAddress.postalCode = "779|102";
                billingAddress.country = "GB";
                shippingAddress = new _1.Address();
                shippingAddress.postalCode = "658|325";
                shippingAddress.country = "FR";
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "1234";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerId("100")
                        .withProductId("999")
                        .withClientTransactionId("test")
                        .withCustomerIpAddress("123.123.123.123")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-Validation-005h")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Validation_006a", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                config.channel = "ECOM";
                _1.ServicesContainer.configure(config);
                billingAddress = new _1.Address();
                billingAddress.postalCode = "779|102";
                billingAddress.country = "GB";
                shippingAddress = new _1.Address();
                shippingAddress.postalCode = "658|325";
                shippingAddress.country = "FR";
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerId("100")
                        .withProductId("999")
                        .withClientTransactionId("test")
                        .withCustomerIpAddress("123.123.123.123")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-Validation-006a")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Validation_006b", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                config.channel = "ECOM";
                _1.ServicesContainer.configure(config);
                billingAddress = new _1.Address();
                billingAddress.postalCode = "779|102";
                billingAddress.country = "GB";
                shippingAddress = new _1.Address();
                shippingAddress.postalCode = "658|325";
                shippingAddress.country = "FR";
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerId("100")
                        .withProductId("999")
                        .withClientTransactionId("test")
                        .withCustomerIpAddress("123.123.123.123")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-Validation-006b")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Validation_006c", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                config.channel = "ECOM";
                _1.ServicesContainer.configure(config);
                billingAddress = new _1.Address();
                billingAddress.postalCode = "779|102";
                billingAddress.country = "GB";
                shippingAddress = new _1.Address();
                shippingAddress.postalCode = "658|325";
                shippingAddress.country = "FR";
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "11";
                card.expYear = "2015";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerId("100")
                        .withProductId("999")
                        .withClientTransactionId("test")
                        .withCustomerIpAddress("123.123.123.123")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-Validation-006c")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Validation_006d", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                config.channel = "ECOM";
                _1.ServicesContainer.configure(config);
                billingAddress = new _1.Address();
                billingAddress.postalCode = "779|102";
                billingAddress.country = "GB";
                shippingAddress = new _1.Address();
                shippingAddress.postalCode = "658|325";
                shippingAddress.country = "FR";
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "11";
                card.expYear = "5";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerId("100")
                        .withProductId("999")
                        .withClientTransactionId("test")
                        .withCustomerIpAddress("123.123.123.123")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-Validation-006d")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Validation_006e", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                config.channel = "ECOM";
                _1.ServicesContainer.configure(config);
                billingAddress = new _1.Address();
                billingAddress.postalCode = "779|102";
                billingAddress.country = "GB";
                shippingAddress = new _1.Address();
                shippingAddress.postalCode = "658|325";
                shippingAddress.country = "FR";
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "1234";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerId("100")
                        .withProductId("999")
                        .withClientTransactionId("test")
                        .withCustomerIpAddress("123.123.123.123")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-Validation-006e")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Validation_007a", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                config.channel = "ECOM";
                _1.ServicesContainer.configure(config);
                billingAddress = new _1.Address();
                billingAddress.postalCode = "779|102";
                billingAddress.country = "GB";
                shippingAddress = new _1.Address();
                shippingAddress.postalCode = "658|325";
                shippingAddress.country = "FR";
                card = new _1.CreditCardData();
                card.number = "5425230000004415";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerId("100")
                        .withProductId("999")
                        .withClientTransactionId("test")
                        .withCustomerIpAddress("123.123.123.123")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-Validation-007a")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Validation_007b", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                config.channel = "ECOM";
                _1.ServicesContainer.configure(config);
                billingAddress = new _1.Address();
                billingAddress.postalCode = "779|102";
                billingAddress.country = "GB";
                shippingAddress = new _1.Address();
                shippingAddress.postalCode = "658|325";
                shippingAddress.country = "FR";
                card = new _1.CreditCardData();
                card.number = "5425230000004415";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerId("100")
                        .withProductId("999")
                        .withClientTransactionId("test")
                        .withCustomerIpAddress("123.123.123.123")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-Validation-007b")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Validation_007d", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                config.channel = "ECOM";
                _1.ServicesContainer.configure(config);
                billingAddress = new _1.Address();
                billingAddress.postalCode = "779|102";
                billingAddress.country = "GB";
                shippingAddress = new _1.Address();
                shippingAddress.postalCode = "658|325";
                shippingAddress.country = "FR";
                card = new _1.CreditCardData();
                card.number = "5425230000004415";
                card.expMonth = "11";
                card.expYear = "2015";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerId("100")
                        .withProductId("999")
                        .withClientTransactionId("test")
                        .withCustomerIpAddress("123.123.123.123")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-Validation-007d")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Validation_007e", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                config.channel = "ECOM";
                _1.ServicesContainer.configure(config);
                billingAddress = new _1.Address();
                billingAddress.postalCode = "779|102";
                billingAddress.country = "GB";
                shippingAddress = new _1.Address();
                shippingAddress.postalCode = "658|325";
                shippingAddress.country = "FR";
                card = new _1.CreditCardData();
                card.number = "5425230000004415";
                card.expMonth = "11";
                card.expYear = "5";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerId("100")
                        .withProductId("999")
                        .withClientTransactionId("test")
                        .withCustomerIpAddress("123.123.123.123")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-Validation-007e")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Validation_007f", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                config.channel = "ECOM";
                _1.ServicesContainer.configure(config);
                billingAddress = new _1.Address();
                billingAddress.postalCode = "779|102";
                billingAddress.country = "GB";
                shippingAddress = new _1.Address();
                shippingAddress.postalCode = "658|325";
                shippingAddress.country = "FR";
                card = new _1.CreditCardData();
                card.number = "5425230000004415";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "1234";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerId("100")
                        .withProductId("999")
                        .withClientTransactionId("test")
                        .withCustomerIpAddress("123.123.123.123")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-Validation-007f")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Validation_008b", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                config.channel = "ECOM";
                _1.ServicesContainer.configure(config);
                billingAddress = new _1.Address();
                billingAddress.postalCode = "779|102";
                billingAddress.country = "GB";
                shippingAddress = new _1.Address();
                shippingAddress.postalCode = "658|325";
                shippingAddress.country = "FR";
                card = new _1.CreditCardData();
                card.number = "374101000000608";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "1234";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerId("100")
                        .withProductId("999")
                        .withClientTransactionId("test")
                        .withCustomerIpAddress("123.123.123.123")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-Validation-008b")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Validation_008c", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                config.channel = "ECOM";
                _1.ServicesContainer.configure(config);
                billingAddress = new _1.Address();
                billingAddress.postalCode = "779|102";
                billingAddress.country = "GB";
                shippingAddress = new _1.Address();
                shippingAddress.postalCode = "658|325";
                shippingAddress.country = "FR";
                card = new _1.CreditCardData();
                card.number = "374101000000608";
                card.expMonth = "11";
                card.expYear = "2015";
                card.cvn = "1234";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerId("100")
                        .withProductId("999")
                        .withClientTransactionId("test")
                        .withCustomerIpAddress("123.123.123.123")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-Validation-008c")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Validation_008d", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                config.channel = "ECOM";
                _1.ServicesContainer.configure(config);
                billingAddress = new _1.Address();
                billingAddress.postalCode = "779|102";
                billingAddress.country = "GB";
                shippingAddress = new _1.Address();
                shippingAddress.postalCode = "658|325";
                shippingAddress.country = "FR";
                card = new _1.CreditCardData();
                card.number = "374101000000608";
                card.expMonth = "11";
                card.expYear = "5";
                card.cvn = "1234";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerId("100")
                        .withProductId("999")
                        .withClientTransactionId("test")
                        .withCustomerIpAddress("123.123.123.123")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-Validation-008d")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Validation_009b", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                config.channel = "ECOM";
                _1.ServicesContainer.configure(config);
                billingAddress = new _1.Address();
                billingAddress.postalCode = "779|102";
                billingAddress.country = "GB";
                shippingAddress = new _1.Address();
                shippingAddress.postalCode = "658|325";
                shippingAddress.country = "FR";
                card = new _1.CreditCardData();
                card.number = "30384800000000";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerId("100")
                        .withProductId("999")
                        .withClientTransactionId("test")
                        .withCustomerIpAddress("123.123.123.123")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-Validation-009b")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Validation_009c", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                config.channel = "ECOM";
                _1.ServicesContainer.configure(config);
                billingAddress = new _1.Address();
                billingAddress.postalCode = "779|102";
                billingAddress.country = "GB";
                shippingAddress = new _1.Address();
                shippingAddress.postalCode = "658|325";
                shippingAddress.country = "FR";
                card = new _1.CreditCardData();
                card.number = "30450100000000";
                card.expMonth = "11";
                card.expYear = "2015";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerId("100")
                        .withProductId("999")
                        .withClientTransactionId("test")
                        .withCustomerIpAddress("123.123.123.123")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-Validation-009c")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Validation_009d", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                config.channel = "ECOM";
                _1.ServicesContainer.configure(config);
                billingAddress = new _1.Address();
                billingAddress.postalCode = "779|102";
                billingAddress.country = "GB";
                shippingAddress = new _1.Address();
                shippingAddress.postalCode = "658|325";
                shippingAddress.country = "FR";
                card = new _1.CreditCardData();
                card.number = "30450100000000";
                card.expMonth = "11";
                card.expYear = "5";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerId("100")
                        .withProductId("999")
                        .withClientTransactionId("test")
                        .withCustomerIpAddress("123.123.123.123")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-Validation-009d")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
