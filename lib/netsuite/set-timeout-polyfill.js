function definePolyfill(global) {
    // tslint:disable:only-arrow-functions
    global.setTimeout = function (callable, _) {
        return callable.apply(global, [].slice.call(arguments, 2));
    };
    // tslint:enable:only-arrow-functions
}
var local;
if (typeof exports !== "undefined") {
    local = exports;
}
else if (typeof global !== "undefined") {
    local = global;
}
else if (typeof self !== "undefined") {
    local = self;
}
else {
    try {
        local = Function("return this")();
    }
    catch (e) {
        throw new Error("setTimeout polyfill failed.");
    }
}
var P = local.Promise;
if (P) {
    var promiseToString = null;
    try {
        promiseToString = Object.prototype.toString.call(local.setTimeout);
    }
    catch (e) {
        /** om nom nom */
    }
    if (promiseToString !== "[object Function]") {
        definePolyfill(local);
    }
}
