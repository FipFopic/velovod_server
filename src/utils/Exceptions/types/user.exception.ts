import { HttpException, HttpStatus } from '@nestjs/common'

export class UserException {  
  UserNotFound() {
    return new HttpException(
      { message: 'Пользователь не найден' },
      HttpStatus.BAD_REQUEST
    )
  }

  UserNotUniq() {
    return new HttpException(
      { message: 'Пользователь уже существует' },
      HttpStatus.BAD_REQUEST
    )
  }

  UserWrongLoginOrPassword() {
    return new HttpException(
      { message: 'Логин или пароль неверный' },
      HttpStatus.BAD_REQUEST
    )
  }

  UserBlocked() {
    return new HttpException(
      { message: 'Пользователь заблокирован' },
      HttpStatus.BAD_REQUEST
    )
  }

  UserFrozen() {
    return new HttpException(
      { message: 'Пользователь заморожен' },
      HttpStatus.BAD_REQUEST
    )
  }
}
