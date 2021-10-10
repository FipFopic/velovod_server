import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { UserService } from './../../modules/user/services/user.service'
import { TokenService } from './../../modules/user/services/token.service'
import { ApiException } from 'src/utils/Exceptions/api.exception'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService
  ) { }

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeaders = req.headers.authorization

    if (!authHeaders || !(authHeaders as string).split(' ')[1]) {
      throw ApiException.Unauthorized()
    }

    const accessToken = (authHeaders as string).split(' ')[1]
    const userData = this.tokenService.validateAccessToken(accessToken)

    if (!userData) {
      throw ApiException.Unauthorized()
    }

    const user = await this.userService.getUser(Number(userData.id))

    if (!user) {
      throw ApiException.Unauthorized()
    }

    (req as any).user = user

    next()
  }
}
