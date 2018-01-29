"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = require("ava");
var _1 = require("../../../../src/");
var config = new _1.ServicesConfig();
config.secretApiKey = "skapi_cert_MTeSAQAfG1UA9qQDrzl-kz4toXvARyieptFwSKP24w";
config.serviceUrl = "https://cert.api2.heartlandportico.com";
ava_1.default.before(function (_t) {
    _1.ServicesContainer.configure(config);
});
ava_1.default("report transaction details no transaction id", function (t) {
    t.plan(3);
    var error = t.throws(function () {
        return _1.ReportingService.transactionDetail("").execute();
    }, _1.ArgumentError);
    t.is(error.name, "ArgumentError");
    t.true(-1 !== error.message.indexOf("transactionId cannot be empty"));
});
ava_1.default("report transaction details with device id", function (t) {
    t.plan(3);
    var error = t.throws(function () {
        return _1.ReportingService.transactionDetail("1234567890")
            .withDeviceId("123456")
            .execute();
    }, _1.ArgumentError);
    t.is(error.name, "ArgumentError");
    t.true(-1 !== error.message.indexOf("deviceId cannot be set"));
});
ava_1.default("report transaction details with start date", function (t) {
    t.plan(3);
    var error = t.throws(function () {
        return _1.ReportingService.transactionDetail("1234567890")
            .withStartDate(new Date())
            .execute();
    }, _1.ArgumentError);
    t.is(error.name, "ArgumentError");
    t.true(-1 !== error.message.indexOf("startDate cannot be set"));
});
ava_1.default("report transaction details with end date", function (t) {
    t.plan(3);
    var error = t.throws(function () {
        return _1.ReportingService.transactionDetail("1234567890")
            .withEndDate(new Date())
            .execute();
    }, _1.ArgumentError);
    t.is(error.name, "ArgumentError");
    t.true(-1 !== error.message.indexOf("endDate cannot be set"));
});
ava_1.default("report activity with transaction id", function (t) {
    t.plan(3);
    var error = t.throws(function () {
        return _1.ReportingService.activity()
            .withTransactionId("1234567890")
            .execute();
    }, _1.ArgumentError);
    t.is(error.name, "ArgumentError");
    t.true(-1 !== error.message.indexOf("transactionId cannot be set"));
});
