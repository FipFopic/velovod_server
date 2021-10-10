import { HttpException, HttpStatus } from '@nestjs/common'
import { RouteException } from './types/route.exception'
import { UserException } from './types/user.exception'

class ApiExceptionClass {
  readonly user: UserException
  readonly route: RouteException

  constructor() {
    this.user = new UserException()
    this.route = new RouteException()
  }

  Success() {
    return new HttpException({ message: 'Success' }, HttpStatus.OK)
  }

  Error() {
    return new HttpException({ message: 'Fail' }, HttpStatus.BAD_REQUEST)
  }

  Forbidden() {
    return new HttpException({ message: 'Forbidden' }, HttpStatus.FORBIDDEN)
  }

  NotFound() {
    return new HttpException({ message: 'NotFound' }, HttpStatus.BAD_REQUEST)
  }

  Unauthorized() {
    return new HttpException( { message: 'Unauthorized' }, HttpStatus.UNAUTHORIZED)
  }
}

export const ApiException = new ApiExceptionClass()
