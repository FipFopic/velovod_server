import { HttpModule } from '@nestjs/axios'
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { AuthMiddleware } from 'src/common/middlewares/auth.middleware'
import { TokenService } from './services/token.service'
import { UserService } from './services/user.service'
import { UserController } from './user.controller'

@Module({
  imports: [HttpModule],
  controllers: [UserController],
  providers: [UserService, TokenService]
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(AuthMiddleware)
    .forRoutes(
      { path: '/users/profile', method: RequestMethod.GET },
      { path: '/users/profile', method: RequestMethod.PATCH },
      { path: '/users/logout', method: RequestMethod.POST }
    )
  }
}
