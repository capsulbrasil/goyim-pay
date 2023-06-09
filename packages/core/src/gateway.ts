import type { UserConfig } from './config'
import type { FetchRequest } from './request'
import type { Payment, PaymentMethod } from './payment'
import { payment } from './payment'

/**
 * Object passed to defineGateway() to create a gateway adapter.
 */
export type GatewayPrototype<
  AcceptedMethod extends PaymentMethod,
  PaymentRequest extends FetchRequest
> = {
  acceptedMethods: AcceptedMethod[]
  cardPaymentRequest?: <Method extends AcceptedMethod & 'creditcard'>(payment: Payment<Method>) => PaymentRequest & Pick<FetchRequest, 'url'>
  billetPaymentRequest?: <Method extends AcceptedMethod & 'billet'>(payment: Payment<Method>) => PaymentRequest & Pick<FetchRequest, 'url'>
}

/**
 * End gateway object that the user can manipulate directly.
 */
export type GatewayInstance<
  Alias extends string,
  AcceptedMethod extends PaymentMethod,
  PaymentRequest extends FetchRequest
> = GatewayPrototype<AcceptedMethod, PaymentRequest> & {
  alias: Alias
  payment: <Method extends AcceptedMethod>(payment: Payment<Method>) => void
}

/**
 * Function that returns a GatewayInstance given a UserConfig as parameter.
 */
export type Gateway<
  Alias extends string,
  GatewayConfig extends object,
  AcceptedMethod extends PaymentMethod,
  PaymentRequest extends FetchRequest
> = (config: Omit<UserConfig, 'gateways'> & {
  gateways: Record<Alias, GatewayConfig>
}) => GatewayInstance<Alias, AcceptedMethod, PaymentRequest>

export type GatewayPrototypeFunction<
  Alias extends string,
  GatewayConfig extends object,
  AcceptedMethod extends PaymentMethod,
  PaymentRequest extends FetchRequest
> = (config: Omit<UserConfig, 'gateways'> & {
  gateways: Record<Alias, GatewayConfig>
}) => Omit<GatewayInstance<Alias, AcceptedMethod, PaymentRequest>, 'payment'>

/**
 * Provides a shorthand for defining gateway adapters.
 */
export const defineGateway = <
  GatewayConfig extends object,
  PaymentRequest extends FetchRequest
>() => <
  Alias extends string,
  AcceptedMethod extends PaymentMethod
>(fn: GatewayPrototypeFunction<Alias, GatewayConfig, AcceptedMethod, PaymentRequest>) => {
  return (...args: Parameters<typeof fn>) => {
    const gateway = fn(...args) as unknown as GatewayInstance<Alias, AcceptedMethod, PaymentRequest>
    gateway.payment = payment
    return gateway
  }
}
