
export interface UserData {
  id: number
  email: string
}

interface UserProfile {
  name: string
  avatar?: string
}

export interface UserProfileData {
  id: number
  email: string
  profile: UserProfile
}
