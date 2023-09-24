"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.topLevel = void 0;
var topLevel = function (adapters) {
    return function (config) {
        var gateways = {};
        for (var gatewayName in adapters) {
            gateways[gatewayName] = adapters[gatewayName](config);
        }
        return {
            gateways: gateways
        };
    };
};
exports.topLevel = topLevel;
