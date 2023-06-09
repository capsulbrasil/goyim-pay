export type UserConfig = {
  waterfal?: {
    priority: Array<string>
  }
  gateways: never
}

export const defineConfig = (config: UserConfig) => {
  return config
}
