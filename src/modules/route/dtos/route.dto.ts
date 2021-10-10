import { IsInt, IsNotEmpty, Max, Min, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { RouteType } from '.prisma/client'

export class RoadProperties {
  asphalt?: number

  unpaved?: number

  cobblestone?: number

  unknown?: number
}

export class CreateRouteDto {
  @IsNotEmpty()
  photo: string

  @IsNotEmpty()
  title: string

  description?: string

  @IsInt()
  @Min(60)
  duration: number

  @IsInt()
  @Min(1)
  distance: number

  @Type(() => RoadProperties)
  roadProperties: RoadProperties

  @ValidateNested({ each: true })
  @Type(() => CreatePointDto)
  points: CreatePointDto[]
}

export class CreatePointDto {
  photo?: string

  @IsNotEmpty()
  title: string

  description?: string

  @Min(-90)
  @Max(90)
  latitude: number

  @Min(-180)
  @Max(180)
  longitude: number

  radius?: number

  @IsInt()
  @Min(0)
  order: number
}

export class GetRoutesParams {
  page?: number
  limit?: number
  type?: RouteType
}

export class GetRouteParams {
  type?: RouteType
}
