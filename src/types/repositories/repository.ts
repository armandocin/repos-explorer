import type {User} from '../users/user.ts'

export interface Repository {
  id: number
  name: string
  fullName: string
  description: string
  private: boolean
  htmlUrl: string
  language: string
  owner: User
  stargazersCount: number
}
