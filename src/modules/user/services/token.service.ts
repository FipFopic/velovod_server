import { Injectable } from '@nestjs/common'
import * as jwt from 'jsonwebtoken'
import { configService } from 'src/config/config.service'
import { prisma } from 'src/database/client.database'
import { logger } from 'src/utils/Logger/logger.service'
import { UserData } from './../interfaces/user.interface'

interface ITokens {
  accessToken: string,
  refreshToken: string
}

@Injectable()
export class TokenService {
  /**
   * Generate tokens with user information
   * @param payload UserData
   */
  public generateTokens(payload: UserData): ITokens {
    const accessToken = jwt.sign(
      payload,
      configService.server.SECRET_ACCESS_KEY_JWT_TOKEN,
      { expiresIn: '30m' }
    )
    const refreshToken = jwt.sign(
      payload,
      configService.server.SECRET_REFRESH_KEY_JWT_TOKEN,
      { expiresIn: '14d' }
    )

    return { accessToken, refreshToken }
  }

   /**
   * AccessToken returns matching user information
   * @param accessToken AccessToken
   */
  public validateAccessToken(token: string): UserData | null {
    try {

      const res = jwt.verify(token, configService.server.SECRET_ACCESS_KEY_JWT_TOKEN)

      return res as UserData

    } catch (e: any) {
      return null
    }
  }

  /**
   * RefreshToken returns matching user information
   * @param userId User ID
   * @param refreshToken RefreshToken
   */
  public async validateRefreshToken(refreshToken: string): Promise<UserData | null> {
    try {

      const res = jwt.verify(refreshToken, configService.server.SECRET_REFRESH_KEY_JWT_TOKEN)
      const userData = res as UserData

      logger.debug('userData', userData)


      const user: UserData = await prisma.user.findFirst({
        where: { id: userData.id, refreshToken },
        select: { id: true, email: true }
      })

      logger.debug('USER', user)

      if (!user) {
        return null
      }

      return user

    } catch (error: any) {
      return null
    }
  }
}
