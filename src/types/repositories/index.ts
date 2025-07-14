import type {User} from '../users'

export interface Repository {
  id: number
  name: string
  full_name: string
  description: string,
  private: string,
  html_url: string
  language: string
  owner: User
}
