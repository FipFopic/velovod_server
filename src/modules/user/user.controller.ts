import { Body, Controller, Get, HttpCode, HttpStatus, Patch, Post, Req, Request, Response } from '@nestjs/common'
import { Request as RequestExpress, Response as ResponseExpress } from 'express'
import { UserService } from './services/user.service'
import { TokenService } from './services/token.service'
import { AuthVK, CreateUserDto, LoginUserDto, UpdateUserDto } from './dtos/user.dto'
import { UserData } from './interfaces/user.interface'
import { ApiException } from 'src/utils/Exceptions/api.exception'

@Controller('/users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService
  ) { }

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Response() res: ResponseExpress, @Body() user: LoginUserDto) {
    const userData = await this.userService.login(user)
    const tokens = this.tokenService.generateTokens(userData)

    await this.userService.saveRefreshToken(userData.id, tokens.refreshToken)

    res.cookie('refreshToken', tokens.refreshToken, {
      maxAge: 14 * 24 * 60 * 60 * 1000,
      httpOnly: true
    })

    res.json({
      ...userData,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken
    })
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('/register')
  async register(@Response() res: ResponseExpress, @Body() user: CreateUserDto) {
    const userData = await this.userService.createUser(user)
    const tokens = this.tokenService.generateTokens(userData)

    await this.userService.saveRefreshToken(userData.id, tokens.refreshToken)

    res.cookie('refreshToken', tokens.refreshToken, {
      maxAge: 14 * 24 * 60 * 60 * 1000,
      httpOnly: true
    })

    res.json({
      ...userData,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken
    })
  }

  @HttpCode(HttpStatus.OK)
  @Post('/auth/vk')
  async authVK(@Body() auth: AuthVK) {
    // const authData = await this.userService.getUserDataFromVk(auth.accessToken)
  }

  @HttpCode(HttpStatus.OK)
  @Post('/logout')
  async logout(@Req() req) {
    const { id } = req.user as UserData

    await this.userService.saveRefreshToken(id, null)

    return { message: 'success' }
  }

  @HttpCode(HttpStatus.OK)
  @Post('/token/refresh')
  async refreshToken(@Body('refreshToken') refreshToken: string) {
    const userData = await this.tokenService.validateRefreshToken(refreshToken)
    
    if (!userData) {
      throw ApiException.Forbidden()
    }

    const tokens = this.tokenService.generateTokens(userData)

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get('/profile')
  async getUserProfile(@Request() req) {
    const { id } = req.user as UserData

    const userProfile = await this.userService.getUserProfile(id)

    return userProfile
  }

  @HttpCode(HttpStatus.OK)
  @Patch('/profile')
  async updateUserProfile(@Request() req, @Body() user: UpdateUserDto) {
    const { id } = req.user as UserData

    await this.userService.updateUserProfile(id, user)

    const userProfile = await this.userService.getUserProfile(id)

    return userProfile
  }
}
