import { MailConfig } from './types/mail.config'
import { ServerConfig } from './types/server.config'
import { env } from './env'

export class ConfigService {
  readonly server: ServerConfig
  readonly mail: MailConfig

  constructor() {
    this.server = new ServerConfig(env.server)
    this.mail = new MailConfig(env.mail)
  }
}

export const configService = new ConfigService()
