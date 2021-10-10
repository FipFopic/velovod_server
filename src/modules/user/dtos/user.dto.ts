import { IsEmail, IsNotEmpty } from 'class-validator'

export class LoginUserDto {
  @IsEmail()
  readonly email: string

  @IsNotEmpty()
  readonly password: string
}

export class CreateUserDto {
  @IsNotEmpty()
  readonly name: string

  @IsEmail()
  readonly email: string

  @IsNotEmpty()
  readonly password: string
}

export class AuthVK {
  @IsNotEmpty()
  accessToken: string
}

export class UpdateUserDto {
  readonly name?: string

  @IsEmail()
  readonly email?: string
  
  readonly avatar?: string
}
