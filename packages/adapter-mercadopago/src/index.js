"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mercadopago = void 0;
var goyim_1 = require("goyim");
exports.mercadopago = (0, goyim_1.defineGateway)()(function (config) {
    return {
        alias: 'mercadopago',
        acceptedMethods: [
            'billet',
            'pix'
        ],
        billetPaymentRequest: function (payment) {
            return {
                url: 'https://api.mercadopago.com/v1/payments',
                headers: {
                    Authorization: "Bearer ".concat(config.gateways.mercadopago.accessToken),
                    'Content-type': 'application/json'
                },
                body: {
                    description: 'test',
                    external_reference: 'test',
                    installments: 1,
                    payment_method_id: 'visa',
                    transaction_amount: 500,
                    payer: {
                        entity_type: 'individual',
                        type: 'customer',
                        email: 'customer@customer.com'
                    },
                    additional_info: {
                        items: [{
                                id: 'id',
                                title: 'produto',
                                description: 'descricao produto',
                                picture_url: 'https://blabla',
                                category_id: 'blabla',
                                quantity: 1,
                                unit_price: 1
                            }],
                        payer: {
                            first_name: payment.customer.name,
                            last_name: payment.customer.name.split(' ').slice(1).join(' '),
                            phone: {
                                area_code: '33',
                                number: '123'
                            }
                        }
                    }
                }
            };
        }
    };
});
