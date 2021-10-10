import { RootConfig } from './RootConfig'

export class MailConfig extends RootConfig {
  private readonly HOST: string
  private readonly PORT: number
  private readonly SECURE: boolean
  private readonly USER: string
  private readonly PASSWORD: string

  constructor(config) {
    super(config)
  }
}
