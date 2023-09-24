"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isGreaterThanZero = exports.isPositive = exports.isInteger = void 0;
var isInteger = function (number) {
    return {
        valid: number % 1 === 0,
        message: 'number must be integer'
    };
};
exports.isInteger = isInteger;
var isPositive = function (number) {
    return {
        valid: number >= 0,
        message: 'number must be positive'
    };
};
exports.isPositive = isPositive;
var isGreaterThanZero = function (number) {
    return {
        valid: number > 0,
        message: 'number must be greater than zero'
    };
};
exports.isGreaterThanZero = isGreaterThanZero;
