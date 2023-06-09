import { isInteger, isPositive } from './sanitization'
import { left, right } from './utils'

export type PaymentParameters = {
  creditcard: {
    card: {
      number: string
      holder: string
      expirationDate: string
      securityCode: string
    }
  }
  billet: never
  pix: never
}

/**
 * Accepted payment methods.
 */
export type PaymentMethod = keyof PaymentParameters

export type Customer = {
  name: string
  email: string
  birthdate?: Date|string
}

export type Address = {
  zipcode: string
  state: string
  city: string
  street: string
  number: string
  complement?: string
  country?: string
}

export type Payment<Method extends PaymentMethod> = {
  installments: number
  amount: number
  customer: Customer
  shippingAddress: Address
  billingAddress: Address
  method: PaymentParameters[Method] & {
    name: Method
  }
}

export const payment = <Method extends PaymentMethod>(payment: Payment<Method>) => {
  let sanitizationTest: ReturnType<typeof isInteger> & ReturnType<typeof isPositive>
  sanitizationTest = isInteger(payment.amount ); if( !sanitizationTest.valid ) return left(sanitizationTest)
  sanitizationTest = isPositive(payment.amount ); if( !sanitizationTest.valid ) return left(sanitizationTest)
  return right(payment)
}
