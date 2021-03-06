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
var _1 = require("../../../src/");
var Data_1 = require("../../Data");
var config = new _1.ServicesConfig();
config.secretApiKey = "skapi_cert_MTyMAQBiHVEAewvIzXVFcmUd2UcyBge_eCpaASUp0A";
config.serviceUrl = "https://cert.api2.heartlandportico.com";
var service = new _1.CreditService(config);
var runSerially = false;
var test = runSerially ? ava_1.default.serial : ava_1.default;
var card = Data_1.TestCards.visaManual();
test("auth capture", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var response, capture;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                return [4 /*yield*/, service
                        .authorize(10)
                        .withCurrency("USD")
                        .withPaymentMethod(card)
                        .withAllowDuplicates(true)
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is(response.responseCode, "00");
                return [4 /*yield*/, service.capture(response.transactionId).execute()];
            case 2:
                capture = _a.sent();
                t.truthy(capture);
                t.is(capture.responseCode, "00");
                return [2 /*return*/];
        }
    });
}); });
test("sale", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                return [4 /*yield*/, service
                        .charge(11.01)
                        .withCurrency("USD")
                        .withPaymentMethod(card)
                        .withAllowDuplicates(true)
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is(response.responseCode, "00");
                return [2 /*return*/];
        }
    });
}); });
test("edit", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var response, edit;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                return [4 /*yield*/, service
                        .charge(12)
                        .withCurrency("USD")
                        .withPaymentMethod(card)
                        .withAllowDuplicates(true)
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is(response.responseCode, "00");
                return [4 /*yield*/, service
                        .edit(response.transactionId)
                        .withAmount(14)
                        .withGratuity(2)
                        .execute()];
            case 2:
                edit = _a.sent();
                t.truthy(edit);
                t.is(edit.responseCode, "00");
                return [2 /*return*/];
        }
    });
}); });
test("commercial edit", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var response, edit;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                return [4 /*yield*/, service
                        .charge(13)
                        .withCurrency("USD")
                        .withPaymentMethod(card)
                        .withCommercialRequest(true)
                        .withAllowDuplicates(true)
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is(response.responseCode, "00");
                return [4 /*yield*/, service
                        .edit(response.transactionId)
                        .withTaxType(_1.TaxType.SalesTax)
                        .withTaxAmount(1)
                        .execute()];
            case 2:
                edit = _a.sent();
                t.truthy(edit);
                t.is(edit.responseCode, "00");
                return [2 /*return*/];
        }
    });
}); });
test("refund by card", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var response, refund;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                return [4 /*yield*/, service
                        .charge(14)
                        .withCurrency("USD")
                        .withPaymentMethod(card)
                        .withAllowDuplicates(true)
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is(response.responseCode, "00");
                return [4 /*yield*/, service
                        .refund(14)
                        .withCurrency("USD")
                        .withPaymentMethod(card)
                        .execute()];
            case 2:
                refund = _a.sent();
                t.truthy(refund);
                t.is(refund.responseCode, "00");
                return [2 /*return*/];
        }
    });
}); });
test("refund by transaction ID", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var response, refund;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                return [4 /*yield*/, service
                        .charge(15)
                        .withCurrency("USD")
                        .withPaymentMethod(card)
                        .withAllowDuplicates(true)
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is(response.responseCode, "00");
                return [4 /*yield*/, service
                        .refund(15)
                        .withCurrency("USD")
                        .withTransactionId(response.transactionId)
                        .execute()];
            case 2:
                refund = _a.sent();
                t.truthy(refund);
                t.is(refund.responseCode, "00");
                return [2 /*return*/];
        }
    });
}); });
test("reverse by card", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var response, reverse;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                return [4 /*yield*/, service
                        .charge(16)
                        .withCurrency("USD")
                        .withPaymentMethod(card)
                        .withAllowDuplicates(true)
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is(response.responseCode, "00");
                return [4 /*yield*/, service
                        .reverse(16)
                        .withCurrency("USD")
                        .withPaymentMethod(card)
                        .execute()];
            case 2:
                reverse = _a.sent();
                t.truthy(reverse);
                t.is(reverse.responseCode, "00");
                return [2 /*return*/];
        }
    });
}); });
test("reverse by transaction ID", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var response, reverse;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                return [4 /*yield*/, service
                        .charge(17)
                        .withCurrency("USD")
                        .withPaymentMethod(card)
                        .withAllowDuplicates(true)
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is(response.responseCode, "00");
                return [4 /*yield*/, service
                        .reverse(17)
                        .withCurrency("USD")
                        .withTransactionId(response.transactionId)
                        .execute()];
            case 2:
                reverse = _a.sent();
                t.truthy(reverse);
                t.is(reverse.responseCode, "00");
                return [2 /*return*/];
        }
    });
}); });
test("verify", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                return [4 /*yield*/, service
                        .verify()
                        .withCurrency("USD")
                        .withPaymentMethod(card)
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is(response.responseCode, "00");
                return [2 /*return*/];
        }
    });
}); });
test("reverse by client transaction ID", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var response, voidResponse;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                return [4 /*yield*/, service
                        .charge(19)
                        .withCurrency("USD")
                        .withPaymentMethod(card)
                        .withClientTransactionId("123456789")
                        .withAllowDuplicates(true)
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is(response.responseCode, "00");
                return [4 /*yield*/, service.void(response.transactionId).execute()];
            case 2:
                voidResponse = _a.sent();
                t.truthy(voidResponse);
                t.is(voidResponse.responseCode, "00");
                return [2 /*return*/];
        }
    });
}); });
