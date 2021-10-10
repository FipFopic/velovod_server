import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { RouteModule } from './modules/route/route.module'
import { UserModule } from './modules/user/user.module'

@Module({
  imports: [UserModule, RouteModule]
})
export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    const middlewares = []

    consumer
        .apply(...middlewares)
        .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
