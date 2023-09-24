"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineGateway = void 0;
var payment_1 = require("./payment");
/**
 * Provides a shorthand for defining gateway adapters.
 */
var defineGateway = function () { return function (fn) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var gateway = fn.apply(void 0, args);
        gateway.payment = payment_1.payment;
        return gateway;
    };
}; };
exports.defineGateway = defineGateway;
