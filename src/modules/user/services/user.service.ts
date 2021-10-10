import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import * as bcrypt from 'bcrypt'
import { configService } from 'src/config/config.service'
import { prisma } from 'src/database/client.database'
import { ApiException } from 'src/utils/Exceptions/api.exception'
import { CreateUserDto, LoginUserDto, UpdateUserDto } from '../dtos/user.dto'
import { UserData, UserProfileData } from '../interfaces/user.interface'
import { logger } from 'src/utils/Logger/logger.service'

@Injectable()
export class UserService {
  constructor(
    private http: HttpService
  ) { }

  public async login(userDto: LoginUserDto): Promise<UserData> {
    try {

      const { email, password } = userDto
      
      const candidate = await prisma.user.findFirst({
        where: { email }
      })

      if (!candidate) {
        throw ApiException.user.UserWrongLoginOrPassword()
      }

      const isPasswordEquals = await bcrypt.compare(password, candidate.password)

      if (!isPasswordEquals) {
        throw ApiException.user.UserWrongLoginOrPassword()
      }
      
      const user: UserData = { id: candidate.id, email: candidate.email }

      return user

    } catch (error: any) {
      throw error
    }
  }

  public async createUser(userDto: CreateUserDto): Promise<UserData> {
    try {

      const { email, password, name } = userDto

      const candidate = await prisma.user.findUnique({
        where: { email }
      })

      if (candidate) {
        throw ApiException.user.UserNotUniq()
      }

      const hashPassword = await bcrypt.hash(password, configService.server.PASSWORD_ROUNDS)

      const createdUser: UserData = await prisma.user.create({
        data: { email, password: hashPassword },
        select: { id: true, email: true }
      })

      const profile = await prisma.profile.create({
        data: { userId: createdUser.id, name },
        select: { id: true }
      })

      await prisma.statistics.create({
        data: { profileId: profile.id }
      })

      return createdUser

    } catch (error: any) {
      throw error
    }
  }

  public async getUserProfile(userId: number): Promise<UserProfileData> {
    try {

      const userProfile: UserProfileData = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          profile: {
            select: {
              name: true,
              avatar: true
            }
          }
        }
      })

      return userProfile

    } catch (error: any) {
      throw error
    }
  }

  public async updateUserProfile(userId: number, userDto: UpdateUserDto): Promise<void> {
    try {

      await prisma.user.update({
        where: { id: userId },
        data: {
          email: userDto.email
        }
      })

      await prisma.profile.update({
        where: { userId },
        data: {
          name: userDto.name,
          avatar: userDto.avatar
        }
      })

    } catch (error: any) {
      throw error
    }
  }

   /**
   * Save refresh token to the user
   * @param userId User ID
   * @param refreshToken RefreshToken
   */
  public async saveRefreshToken(userId: number, refreshToken: string | null): Promise<void> {
    try {

      await prisma.user.update({
        where: { id: userId },
        data: { refreshToken }
      })

    } catch (error: any) {
      throw error
    }
  }

   /**
   * Get user by ID
   * @param userId User ID
   */
  public async getUser(id: number): Promise<UserData | null> {
    try {

      const user: UserData = await prisma.user.findUnique({
        where: { id },
        select: { id: true, email: true }
      })

      return user

    } catch (error: any) {
      return null
    }
  }

  /**
   * Get user data from VK
   * @param accessToken 
   */
  // public async getUserDataFromVk(accessToken: string): Promise<any> {
    // try {
      
    //   const res = this.http
    //       .get(
    //         `https://api.vk.com/method/users.get?fields=bdate,photo_medium,uid,domain&access_token=9023d455d33f24cf75815e0d703195e6597b4e3b1e7d2677189dcb20bc8341fe28a5540642e04c22ac382&v=5.81`
    //       )
    //       .toPromise()
      
    //   logger.debug('RESULT', await res)
    //   logger.debug('RESULT', res)

    // } catch (error: any) {
    //   return null
    // }
  // }
}
