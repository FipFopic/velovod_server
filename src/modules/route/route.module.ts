import { HttpModule } from '@nestjs/axios'
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { AuthMiddleware } from 'src/common/middlewares/auth.middleware'
import { TokenService } from '../user/services/token.service'
import { UserService } from '../user/services/user.service'
import { RouteController } from './route.controller'
import { RouteService } from './services/route.service'

@Module({
  imports: [HttpModule],
  controllers: [RouteController],
  providers: [RouteService, UserService, TokenService]
})
export class RouteModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
        .apply(AuthMiddleware)
        .forRoutes(
          { path: '/routes', method: RequestMethod.POST }
        )
  }
}
