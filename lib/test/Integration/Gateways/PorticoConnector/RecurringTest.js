"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = require("ava");
var _1 = require("../../../../src/");
var config = new _1.ServicesConfig();
config.secretApiKey = "skapi_cert_MTyMAQBiHVEAewvIzXVFcmUd2UcyBge_eCpaASUp0A";
config.serviceUrl = "https://cert.api2.heartlandportico.com";
// const runSerially = false;
// const test = runSerially ? ava.serial : ava;
ava_1.default.before(function (_t) {
    _1.ServicesContainer.configure(config);
});
