"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
var instance = (0, _1.cielo)({
    gateways: {
        cielo: {
            merchantKey: 'test',
            merchantId: 'test'
        }
    }
});
var p = instance.payment({
    installments: 1,
    amount: -500,
    customer: {
        name: 'João',
        email: 'joaosan177@gmail.com'
    },
    shippingAddress: {
        zipcode: '35588000',
        state: 'MG',
        city: 'Arcos',
        street: 'Rua jacinto da veiga',
        number: '855',
    },
    billingAddress: {
        zipcode: '35588000',
        state: 'MG',
        city: 'Arcos',
        street: 'Rua jacinto da veiga',
        number: '855',
    },
    method: {
        name: 'creditcard',
        card: {
            holder: 'João Santos',
            number: '4000300020001000',
            expirationDate: '2023/02',
            securityCode: '123'
        }
    }
});
console.log(JSON.stringify(p, null, 2));
