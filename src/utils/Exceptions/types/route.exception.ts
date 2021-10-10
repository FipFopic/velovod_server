import { HttpException, HttpStatus } from '@nestjs/common'

export class RouteException {
  NeedAddPoints() {
    return new HttpException(
      { message: 'Необходимо добавить точки маршрута' },
      HttpStatus.BAD_REQUEST
    )
  }
  NotRoute() {
    return new HttpException(
      { message: 'Данного маршрута не существует' },
      HttpStatus.BAD_REQUEST
    )
  }
}
