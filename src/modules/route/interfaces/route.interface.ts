
export interface RoutePreviewData {
  id: number
  photo: string
  title: string
  duration: number // In seconds
  distance: number // In meters
  countPoints: number
}

export interface RouteData {
  id: number
  photo: string
  title: string
  description?: string
  duration: number // In seconds
  distance: number // In meters
  roadProperties: RoadPropertiesData
  user: { id: number }
  points: RoutePointData[]
}

interface RoadPropertiesData {
  asphalt: number
  unpaved: number
  cobblestone: number
  unknown: number
}

export interface RoutePointData {
  id: number
  photo?: string
  title: string
  description?: string
  latitude: number
  longitude: number
  radius: number
}
