import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, Request } from '@nestjs/common'
import { UserData } from '../user/interfaces/user.interface'
import { CreateRouteDto, GetRouteParams, GetRoutesParams } from './dtos/route.dto'
import { RouteService } from './services/route.service'

@Controller('/routes')
export class RouteController {
  constructor(
    private readonly routeService: RouteService
  ) { }

  @HttpCode(HttpStatus.CREATED)
  @Post('')
  async createRoute(@Request() req, @Body() route: CreateRouteDto) {
    const { id } = req.user as UserData
    
    const routePreviewData = await this.routeService.createRoute(route, id)

    return routePreviewData
  }

  @HttpCode(HttpStatus.OK)
  @Get('')
  async getRoutes(@Query() params: GetRoutesParams) {
    params.limit = params.limit > 100 ? 100 : params.limit

    const routesPreviewData = await this.routeService.getRoutes(params)

    return routesPreviewData
  }

  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  async getRouteById(@Param('id') id: string, @Query() params: GetRouteParams) {
    const routeData = await this.routeService.getRouteById(Number(id), params)

    return routeData
  }
}
