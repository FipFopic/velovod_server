import { NestApplicationOptions } from '@nestjs/common'
import { RootConfig } from './RootConfig'

export class ServerConfig extends RootConfig {
  private readonly ENV_MODE: string
  readonly PORT: number
  readonly HOST: string
  readonly API_PREFIX: string
  readonly SECRET_ACCESS_KEY_JWT_TOKEN: string
  readonly SECRET_REFRESH_KEY_JWT_TOKEN: string
  readonly PASSWORD_ROUNDS: number
  readonly AUTH_VK_CLIENT_ID: number
  readonly AUTH_VK_CLIENT_SECRET: string
  readonly RATE_LIMIT_MAX: number

  constructor(config) {
    super(config)
  }
  
  public isProduction(): boolean {
    return this.ENV_MODE === 'PRODUCTION'
  }

  public getApplicationOptions(): NestApplicationOptions {
    if (this.isProduction()) {
      return {}
    }

    return { cors: true }
  }
}
