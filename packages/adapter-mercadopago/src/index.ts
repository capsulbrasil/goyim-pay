import { defineGateway } from 'goyim'

export type MercadopagoConfig = {
  accessToken: string
}

export type MercadopagoPaymentMethod =
  'visa'
  | 'pix'
  | 'account_money'
  | 'debin_transfer'
  | 'ted'
  | 'cvu'

export type MercadopagoPaymentRequest = {
  body: {
    description: string
    external_reference: string
    installments: number
    payment_method_id: MercadopagoPaymentMethod
    transaction_amount: number
    payer: {
      entity_type:
        'individual'
        | 'association'
      type:
        'customer'
        | 'registered'
        | 'guest'
      email: string
    }
    additional_info: {
      items: Array<{
        id: string
        title: string
        description: string
        picture_url: string
        category_id: string
        quantity: number
        unit_price: number
      }>
      payer: {
        first_name: string
        last_name: string
        phone: {
          area_code: string
          number: string
        }
      }
      shipments?: {
        receiver_address: {
          zip_code: `${number}-${number}`
          state_name: string
          city_name: string
          street_name: string
          street_number: string
        }
      }
    }
  }
}

export const mercadopago = defineGateway<MercadopagoConfig, MercadopagoPaymentRequest>()((config) => {
  return {
    alias: 'mercadopago',
    acceptedMethods: [
      'billet',
      'pix'
    ],
    billetPaymentRequest: (payment) => {
      return {
        url: 'https://api.mercadopago.com/v1/payments',
        headers: {
          Authorization: `Bearer ${config.gateways.mercadopago!.accessToken}`,
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
      }
    }
  }
})
