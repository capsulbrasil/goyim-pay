import type { UserConfig } from './config'
import type { FetchRequest } from './request'
import type { PaymentMethod } from './payment'

/**
 * Object passed to defineGateway() to create a gateway adapter.
 */
export type GatewayPrototype<
  AcceptedMethod extends PaymentMethod,
  TransactionRequest extends FetchRequest
> = {
  acceptedMethods: AcceptedMethod[]
  cardTransactionRequest: TransactionRequest & Pick<FetchRequest, 'url'>
}

/**
 * End gateway object that the user can manipulate directly.
 */
export type GatewayInstance<
  Alias extends string,
  AcceptedMethod extends PaymentMethod,
  TransactionRequest extends FetchRequest
> = GatewayPrototype<AcceptedMethod, TransactionRequest> & {
  alias: Alias
}

export type Gateway<
  Alias extends string,
  GatewayConfig extends object,
  AcceptedMethod extends PaymentMethod,
  TransactionRequest extends FetchRequest
> = (config: Omit<UserConfig, 'gateways'> & {
  gateways: Record<Alias, GatewayConfig>
}) => GatewayInstance<Alias, AcceptedMethod, TransactionRequest>

/**
 * Provides a shorthand for defining gateway adapters.
 */
export const defineGateway = <
  GatewayConfig extends object,
  TransactionRequest extends FetchRequest
>() => <
  Alias extends string,
  AcceptedMethod extends PaymentMethod
>(fn: Gateway<Alias, GatewayConfig, AcceptedMethod, TransactionRequest>) => {
  return (...args: Parameters<typeof fn>) => {
    const gateway = fn(...args)
    return gateway
  }
}
