import type {Repository} from '../repositories/repository.ts'

export interface GitHubSearchResponse {
  totalCount: number
  incompleteResults: boolean
  items: Repository[]
}
