import { defineGateway } from 'goyim'

export type CieloConfig = {
  merchantKey: string
  merchantId: string
}

export type CieloAddress = {
  Street: string
  Number: string
  Complement?: string
  ZipCode: string
  City: string
  State: string
  Country: string
}

export type CieloPaymentType =
  'CreditCard'

export type CieloCardBrand =
  'Visa'

export type CieloPaymentRequest = {
  body: {
    MerchantOrderId: string
    Customer: {
      Name: string
      Email: string
      Birthday?: string
      DeliveryAddress: CieloAddress
      Billing: CieloAddress
    }
    Payment: {
      Type: CieloPaymentType
      Currency: 'BRL'
      Country: 'BRA'
      ServiceTaxAmount: number
      Installments: number
      Capture: boolean
      Authenticate: boolean
      Recurrent: false
      SoftDescription: string
      CreditCard: {
        CardNumber: string
        Holder: string
        ExpirationDate: string
        SecurityCode: string
        SaveCard: boolean
        Brand: CieloCardBrand
        CardOnFile: {
          Usage: 'Used'
          Reason: 'Unscheduled'
        }
      }
    }
    IsCryptoCurrencyNegotiation?: false
    Amount: number
  }
}

export const cielo = defineGateway<CieloConfig, CieloPaymentRequest>()((config) => {
  return {
    alias: 'cielo',
    acceptedMethods: [
      'creditcard',
      'pix'
    ],
    cardPaymentRequest: (payment) => {
      return {
        url: 'https://apisandbox.cieloecommerce.cielo.com.br/1/sales/',
        headers: {
          'Content-type': 'application/json',
          MerchantId: config.gateways.cielo.merchantId,
          MerchantKey: config.gateways.cielo.merchantKey,
        },
        body: {
          MerchantOrderId: 'replaceme',
          Customer: {
            Name: payment.customer.name,
            Email: payment.customer.email,
            DeliveryAddress: {
              Street: payment.shippingAddress.street,
              Number: payment.shippingAddress.number,
              Complement: payment.shippingAddress.complement,
              ZipCode: payment.shippingAddress.zipcode,
              City: payment.shippingAddress.city,
              State: payment.shippingAddress.state,
              Country: 'BRA'
            },
            Billing: {
              Street: payment.billingAddress.street,
              Number: payment.billingAddress.number,
              Complement: payment.billingAddress.complement,
              ZipCode: payment.billingAddress.zipcode,
              City: payment.billingAddress.city,
              State: payment.billingAddress.state,
              Country: 'BRA'
            }
          },
          Payment: {
            Type: 'CreditCard',
            Currency: 'BRL',
            Country: 'BRA',
            ServiceTaxAmount: 0,
            Installments: payment.installments,
            Capture: false,
            Authenticate: false,
            Recurrent: false,
            SoftDescription: 'replaceme',
            CreditCard: {
              CardNumber: payment.method.card.number,
              Holder: payment.method.card.holder,
              ExpirationDate: payment.method.card.expirationDate,
              SecurityCode: payment.method.card.securityCode,
              SaveCard: true,
              Brand: 'Visa',
              CardOnFile: {
                Usage: 'Used',
                Reason: 'Unscheduled'
              }
            }
          },
          Amount: 10
        }
      }
    }
  }
})
