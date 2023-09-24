"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.payment = void 0;
var sanitization_1 = require("./sanitization");
var utils_1 = require("./utils");
var payment = function (payment) {
    var sanitizationTest;
    sanitizationTest = (0, sanitization_1.isInteger)(payment.amount);
    if (!sanitizationTest.valid)
        return (0, utils_1.left)(sanitizationTest);
    sanitizationTest = (0, sanitization_1.isPositive)(payment.amount);
    if (!sanitizationTest.valid)
        return (0, utils_1.left)(sanitizationTest);
    return (0, utils_1.right)(payment);
};
exports.payment = payment;
