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
var _1 = require("../../../../src/");
var config = new _1.ServicesConfig();
config.secretApiKey = "skapi_cert_MTeSAQAfG1UA9qQDrzl-kz4toXvARyieptFwSKP24w";
config.serviceUrl = "https://cert.api2.heartlandportico.com";
var card = new _1.CreditCardData();
card.number = "4111111111111111";
card.expMonth = "12";
card.expYear = "2025";
card.cvn = "123";
card.cardHolderName = "Joe Smith";
var track = new _1.CreditTrackData();
// tslint:disable:max-line-length
track.value =
    "<E1050711%B4012001000000016^VI TEST CREDIT^251200000000000000000000?|LO04K0WFOmdkDz0um+GwUkILL8ZZOP6Zc4rCpZ9+kg2T3JBT4AEOilWTI|+++++++Dbbn04ekG|11;4012001000000016=25120000000000000000?|1u2F/aEhbdoPixyAPGyIDv3gBfF|+++++++Dbbn04ekG|00|||/wECAQECAoFGAgEH2wYcShV78RZwb3NAc2VjdXJlZXhjaGFuZ2UubmV0PX50qfj4dt0lu9oFBESQQNkpoxEVpCW3ZKmoIV3T93zphPS3XKP4+DiVlM8VIOOmAuRrpzxNi0TN/DWXWSjUC8m/PI2dACGdl/hVJ/imfqIs68wYDnp8j0ZfgvM26MlnDbTVRrSx68Nzj2QAgpBCHcaBb/FZm9T7pfMr2Mlh2YcAt6gGG1i2bJgiEJn8IiSDX5M2ybzqRT86PCbKle/XCTwFFe1X|>;";
// tslint:enable:max-line-length
track.encryptionData = new _1.EncryptionData();
track.encryptionData.version = "01";
ava_1.default.before(function (_t) {
    _1.ServicesContainer.configure(config);
});
ava_1.default("credit authorization", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var authorization, capture;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                return [4 /*yield*/, card
                        .authorize("14")
                        .withCurrency("USD")
                        .withAllowDuplicates(true)
                        .execute()];
            case 1:
                authorization = _a.sent();
                t.truthy(authorization);
                t.is(authorization.responseCode, "00");
                return [4 /*yield*/, authorization
                        .capture("16")
                        .withGratuity("2.00")
                        .execute()];
            case 2:
                capture = _a.sent();
                t.truthy(capture);
                t.is(capture.responseCode, "00");
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("credit auth with convenience", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var response, report;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                return [4 /*yield*/, card
                        .authorize(14)
                        .withCurrency("USD")
                        .withAllowDuplicates(true)
                        .withConvenienceAmt(2)
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is(response.responseCode, "00");
                return [4 /*yield*/, _1.ReportingService.transactionDetail(response.transactionId).execute()];
            case 2:
                report = _a.sent();
                t.truthy(report);
                t.is(report.convenienceAmt, "2.00");
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("credit auth with shipping", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var response, report;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                return [4 /*yield*/, card
                        .authorize(14)
                        .withCurrency("USD")
                        .withAllowDuplicates(true)
                        .withShippingAmt(2)
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is(response.responseCode, "00");
                return [4 /*yield*/, _1.ReportingService.transactionDetail(response.transactionId).execute()];
            case 2:
                report = _a.sent();
                t.truthy(report);
                t.is(report.shippingAmt, "2.00");
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("credit sale", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                return [4 /*yield*/, card
                        .charge(15)
                        .withCurrency("USD")
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
ava_1.default("credit sale with convenience", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var response, report;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                return [4 /*yield*/, card
                        .charge(15)
                        .withCurrency("USD")
                        .withAllowDuplicates(true)
                        .withConvenienceAmt(2)
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is(response.responseCode, "00");
                return [4 /*yield*/, _1.ReportingService.transactionDetail(response.transactionId).execute()];
            case 2:
                report = _a.sent();
                t.truthy(report);
                t.is(report.convenienceAmt, "2.00");
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("credit sale with shipping", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var response, report;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                return [4 /*yield*/, card
                        .charge(15)
                        .withCurrency("USD")
                        .withAllowDuplicates(true)
                        .withShippingAmt(2)
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is(response.responseCode, "00");
                return [4 /*yield*/, _1.ReportingService.transactionDetail(response.transactionId).execute()];
            case 2:
                report = _a.sent();
                t.truthy(report);
                t.is(report.shippingAmt, "2.00");
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("credit offline authorization", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var authorization;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                return [4 /*yield*/, card
                        .authorize("16")
                        .withCurrency("USD")
                        .withAllowDuplicates(true)
                        .withOfflineAuthCode("123456")
                        .execute()];
            case 1:
                authorization = _a.sent();
                t.truthy(authorization);
                t.is(authorization.responseCode, "00");
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("credit offline auth with convenience", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var response, report;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                return [4 /*yield*/, card
                        .authorize(16)
                        .withCurrency("USD")
                        .withAllowDuplicates(true)
                        .withConvenienceAmt(2)
                        .withOfflineAuthCode("123456")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is(response.responseCode, "00");
                return [4 /*yield*/, _1.ReportingService.transactionDetail(response.transactionId).execute()];
            case 2:
                report = _a.sent();
                t.truthy(report);
                t.is(report.convenienceAmt, "2.00");
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("credit offline auth with shipping", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var response, report;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                return [4 /*yield*/, card
                        .authorize(16)
                        .withCurrency("USD")
                        .withAllowDuplicates(true)
                        .withShippingAmt(2)
                        .withOfflineAuthCode("123456")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is(response.responseCode, "00");
                return [4 /*yield*/, _1.ReportingService.transactionDetail(response.transactionId).execute()];
            case 2:
                report = _a.sent();
                t.truthy(report);
                t.is(report.shippingAmt, "2.00");
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("credit offline sale", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                return [4 /*yield*/, card
                        .charge(17)
                        .withCurrency("USD")
                        .withAllowDuplicates(true)
                        .withOfflineAuthCode("123456")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is(response.responseCode, "00");
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("credit offline sale with convenience", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var response, report;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                return [4 /*yield*/, card
                        .charge(17)
                        .withCurrency("USD")
                        .withAllowDuplicates(true)
                        .withConvenienceAmt(2)
                        .withOfflineAuthCode("123456")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is(response.responseCode, "00");
                return [4 /*yield*/, _1.ReportingService.transactionDetail(response.transactionId).execute()];
            case 2:
                report = _a.sent();
                t.truthy(report);
                t.is(report.convenienceAmt, "2.00");
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("credit offline sale with shipping", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var response, report;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                return [4 /*yield*/, card
                        .charge(17)
                        .withCurrency("USD")
                        .withAllowDuplicates(true)
                        .withShippingAmt(2)
                        .withOfflineAuthCode("123456")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is(response.responseCode, "00");
                return [4 /*yield*/, _1.ReportingService.transactionDetail(response.transactionId).execute()];
            case 2:
                report = _a.sent();
                t.truthy(report);
                t.is(report.shippingAmt, "2.00");
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("credit refund", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                return [4 /*yield*/, card
                        .refund(16)
                        .withCurrency("USD")
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
ava_1.default("credit reverse", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                return [4 /*yield*/, card
                        .reverse(15)
                        .withCurrency("USD")
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
ava_1.default("credit verify", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("USD")
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
ava_1.default("credit swipe authorization", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var authorization, capture;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                return [4 /*yield*/, track
                        .authorize("14")
                        .withCurrency("USD")
                        .withAllowDuplicates(true)
                        .execute()];
            case 1:
                authorization = _a.sent();
                t.truthy(authorization);
                t.is(authorization.responseCode, "00");
                return [4 /*yield*/, authorization
                        .capture("16")
                        .withGratuity("2.00")
                        .execute()];
            case 2:
                capture = _a.sent();
                t.truthy(capture);
                t.is(capture.responseCode, "00");
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("credit swipe sale", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                return [4 /*yield*/, track
                        .charge(15)
                        .withCurrency("USD")
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
ava_1.default("credit swipe offline authorization", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var authorization;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                return [4 /*yield*/, track
                        .authorize("16")
                        .withCurrency("USD")
                        .withAllowDuplicates(true)
                        .withOfflineAuthCode("123456")
                        .execute()];
            case 1:
                authorization = _a.sent();
                t.truthy(authorization);
                t.is(authorization.responseCode, "00");
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("credit swipe offline sale", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                return [4 /*yield*/, track
                        .charge(17)
                        .withCurrency("USD")
                        .withAllowDuplicates(true)
                        .withOfflineAuthCode("123456")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is(response.responseCode, "00");
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.failing("credit swipe add value", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                return [4 /*yield*/, track
                        .addValue(16)
                        .withCurrency("USD")
                        .withAllowDuplicates(true)
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is(response.responseCode, "00", response.responseMessage);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("credit swipe balance inquiry", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                return [4 /*yield*/, track.balanceInquiry().execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is(response.responseCode, "00", response.responseMessage);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("credit swipe refund", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                return [4 /*yield*/, track
                        .refund(16)
                        .withCurrency("USD")
                        .withAllowDuplicates(true)
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is(response.responseCode, "00", response.responseMessage);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("credit swipe reverse", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var sale, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                return [4 /*yield*/, track
                        .charge(19)
                        .withCurrency("USD")
                        .withAllowDuplicates(true)
                        .execute()];
            case 1:
                sale = _a.sent();
                t.truthy(sale);
                t.is(sale.responseCode, "00");
                return [4 /*yield*/, track
                        .reverse(19)
                        .withCurrency("USD")
                        .withAllowDuplicates(true)
                        .execute()];
            case 2:
                response = _a.sent();
                t.truthy(response);
                t.is(response.responseCode, "00", response.responseMessage);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("credit swipe verify", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                return [4 /*yield*/, track
                        .verify()
                        .withCurrency("USD")
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
ava_1.default("credit void from transaction id", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var auth, voidResponse;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                return [4 /*yield*/, card
                        .authorize(10)
                        .withCurrency("USD")
                        .withAllowDuplicates(true)
                        .execute()];
            case 1:
                auth = _a.sent();
                t.truthy(auth);
                t.is(auth.responseCode, "00");
                return [4 /*yield*/, _1.Transaction.fromId(auth.transactionId)
                        .void()
                        .execute()];
            case 2:
                voidResponse = _a.sent();
                t.truthy(voidResponse);
                t.is(voidResponse.responseCode, "00");
                return [2 /*return*/];
        }
    });
}); });
