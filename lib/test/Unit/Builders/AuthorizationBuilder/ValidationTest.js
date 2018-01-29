"use strict";
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
ava_1.default.before(function (_t) {
    _1.ServicesContainer.configure(config);
});
ava_1.default("credit auth no amount", function (t) {
    t.plan(3);
    var error = t.throws(function () {
        return card.authorize().execute();
    }, _1.ArgumentError);
    t.is(error.name, "ArgumentError");
    t.true(-1 !== error.message.indexOf("amount cannot be null"));
});
ava_1.default("credit auth no currency", function (t) {
    t.plan(3);
    var error = t.throws(function () {
        return card.authorize(14).execute();
    }, _1.ArgumentError);
    t.is(error.name, "ArgumentError");
    t.true(-1 !== error.message.indexOf("currency cannot be null"));
});
ava_1.default("credit sale no amount", function (t) {
    t.plan(3);
    var error = t.throws(function () {
        return card.charge().execute();
    }, _1.ArgumentError);
    t.is(error.name, "ArgumentError");
    t.true(-1 !== error.message.indexOf("amount cannot be null"));
});
ava_1.default("credit sale no currency", function (t) {
    t.plan(3);
    var error = t.throws(function () {
        return card.charge(14).execute();
    }, _1.ArgumentError);
    t.is(error.name, "ArgumentError");
    t.true(-1 !== error.message.indexOf("currency cannot be null"));
});
ava_1.default("credit sale no payment method", function (t) {
    t.plan(3);
    var error = t.throws(function () {
        return card
            .charge(14)
            .withCurrency("USD")
            .withPaymentMethod({})
            .execute();
    }, _1.UnsupportedTransactionError);
    t.is(error.name, "UnsupportedTransactionError");
    t.true(-1 !== error.message.indexOf("not supported for this payment method"));
});
ava_1.default("credit offline no amount", function (t) {
    t.plan(3);
    var error = t.throws(function () {
        return card
            .charge()
            .withOfflineAuthCode("123456")
            .execute();
    }, _1.ArgumentError);
    t.is(error.name, "ArgumentError");
    t.true(-1 !== error.message.indexOf("amount cannot be null"));
});
ava_1.default("credit offline no currency", function (t) {
    t.plan(3);
    var error = t.throws(function () {
        return card
            .charge(14)
            .withOfflineAuthCode("123456")
            .execute();
    }, _1.ArgumentError);
    t.is(error.name, "ArgumentError");
    t.true(-1 !== error.message.indexOf("currency cannot be null"));
});
ava_1.default("credit offline no auth code", function (t) {
    t.plan(3);
    var error = t.throws(function () {
        return card
            .charge(14)
            .withCurrency("USD")
            .withOfflineAuthCode("")
            .execute();
    }, _1.ArgumentError);
    t.is(error.name, "ArgumentError");
    t.true(-1 !== error.message.indexOf("offlineAuthCode cannot be empty"));
});
ava_1.default("gift replace no replacement card", function (t) {
    t.plan(3);
    var error = t.throws(function () {
        var gift = new _1.GiftCard();
        gift.alias = "1234567890";
        return gift.replaceWith(undefined).execute();
    }, _1.ArgumentError);
    t.is(error.name, "ArgumentError");
    t.true(-1 !== error.message.indexOf("replacementCard cannot be null"));
});
ava_1.default("check sale no address", function (t) {
    t.plan(3);
    var error = t.throws(function () {
        var check = new _1.ECheck();
        return check
            .charge(14)
            .withCurrency("USD")
            .execute();
    }, _1.ArgumentError);
    t.is(error.name, "ArgumentError");
    t.true(-1 !== error.message.indexOf("billingAddress cannot be null"));
});
