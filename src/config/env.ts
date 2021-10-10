require('dotenv').config({ path: `.env` })

/**
 * Environment variables
 */
export const env = {
  server: {
    env_mode: process.env.NODE_ENV || 'DEVELOPMENT',
    PORT: Number(process.env.PORT) || 8080,
    HOST: process.env.HOST,
    API_PREFIX: 'api/v2',
    SECRET_ACCESS_KEY_JWT_TOKEN: process.env.SECRET_ACCESS_KEY_JWT_TOKEN || 'secret',
    SECRET_REFRESH_KEY_JWT_TOKEN: process.env.SECRET_REFRESH_KEY_JWT_TOKEN || 'secret',
    // AUTH_VK_CLIENT_ID: 5538876,
    // AUTH_VK_CLIENT_SECRET: 'dnPNR01JiH4uDYdiGjYl',
    AUTH_VK_CLIENT_ID: 7970928,
    AUTH_VK_CLIENT_SECRET: 'b33lRP2ErB95xGHjg9JV',
    PASSWORD_ROUNDS: 10
  },
  mail: {
    HOST: 'smtp.gmail.com',
    PORT: 587,
    SECURE: false,
    USER: 'diganik88@gmail.com',
    PASSWORD: 'Dimarius31'
  }
  // mail: {
  //   HOST: 'smtp.yandex.ru',
  //   PORT: 25,
  //   SECURE: false,
  //   USER: 'tech@velovod.com',
  //   PASSWORD: '2279677fed'
  // }
}
