import type { UserConfig } from './config'
import type { Gateway } from './gateway'

export const topLevel = 
  <GatewayAdapters extends Record<string, Gateway<string, any, any, any>>>(adapters: GatewayAdapters) =>
  (config: Omit<UserConfig, 'gateways'> & {
    gateways: {
      [K in keyof GatewayAdapters]: K extends keyof Parameters<GatewayAdapters[K]>[0]['gateways']
        ? Parameters<GatewayAdapters[K]>[0]['gateways'][K]
        : never
    }
}) => {

  const gateways = {} as {
    [K in keyof GatewayAdapters]: ReturnType<GatewayAdapters[K]>
  }

  for( const gatewayName in adapters ) {
    gateways[gatewayName] = adapters[gatewayName](config) as any
  }

  return {
    gateways
  }
}
