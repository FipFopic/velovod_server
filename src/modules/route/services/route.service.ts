import { Injectable } from '@nestjs/common'
import { RouteType } from '.prisma/client'
import { prisma } from 'src/database/client.database'
import { ApiException } from 'src/utils/Exceptions/api.exception'
import { CreatePointDto, CreateRouteDto, GetRouteParams, GetRoutesParams } from '../dtos/route.dto'
import { RouteData, RoutePointData, RoutePreviewData } from '../interfaces/route.interface'

@Injectable()
export class RouteService {
  public async createRoute(routeDto: CreateRouteDto, userId: number): Promise<RoutePreviewData> {
    try {

      const { points, roadProperties, ...route } = routeDto

      if (!points || !points.length) {
        throw ApiException.route.NeedAddPoints()
      }
  
      const savedRoute = await prisma.route.create({
        data: {
          ...route,
          ...roadProperties,
          byUserId: userId
        },
        select: {
          id: true,
          photo: true,
          title: true,
          duration: true,
          distance: true
        }
      })

      const pointsData = points.map((point: CreatePointDto) =>
        ({ ...point, routeId: savedRoute.id, byUserId: userId })
      )

      const savedRoutePoints = await prisma.routePoint.createMany({
        data: pointsData,
        skipDuplicates: true
      })

      return {...savedRoute, countPoints: savedRoutePoints.count }

    } catch (error: any) {
      throw error
    }
  }

  public async getRoutes(params: GetRoutesParams): Promise<RoutePreviewData[]> {
    try {

      const page = params.page || 1
      const limit = params.limit || 10
      const skip = (page - 1) * limit
      const type = params.type || RouteType.LITE

      const routes = await prisma.route.findMany({
        skip: skip,
        take: limit,
        where: {
          type: type,
          // Route have points
          points: {
            some: {
              id: {
                gte: 1
              }
            }
          }
        },
        select: {
          id: true,
          photo: true,
          title: true,
          duration: true,
          distance: true,
          points: true,
          _count: {
            select: {
              points: true
            }
          }
        }
      })

      const routesData: RoutePreviewData[] = routes.map(route => ({
        id: route.id,
        photo: route.photo,
        title: route.title,
        duration: route.duration,
        distance: route.distance,
        countPoints: route._count.points
      } as RoutePreviewData))

      return routesData

    } catch (error: any) {
      throw error
    }
  }

  public async getRouteById(routeId: number, params: GetRouteParams): Promise<RouteData> {
    try {

      const type = params.type || RouteType.LITE

      const routeAllData = await prisma.route.findFirst({
        where: {
          id: routeId,
          type: type
        },
        include: {
          user: true,
          points: {
            orderBy: {
              order: 'asc'
            }
          }
        }
      })

      if (!routeAllData) {
        throw ApiException.route.NotRoute()
      }

      const { user, points, ...routeItem } = routeAllData

      const route = {
        id: routeItem.id,
        photo: routeItem.photo,
        title: routeItem.title,
        description: routeItem.description,
        duration: routeItem.duration,
        distance: routeItem.distance,
        roadProperties: {
          asphalt: routeItem.asphalt,
          unpaved: routeItem.unpaved,
          cobblestone: routeItem.cobblestone,
          unknown: routeItem.unknown,
        }
      }

      const userData = {
        id: user.id
      }

      const pointsData: RoutePointData[] = points.map((point) => ({
        id: point.id,
        photo: point.photo,
        title: point.title,
        description: point.description,
        latitude: point.latitude,
        longitude: point.longitude,
        radius: point.radius
      }))

      const routeData: RouteData = {
        ...route,
        user: userData,
        points: pointsData
      }

      return routeData

    } catch (error: any) {
      throw error
    }
  }
}
