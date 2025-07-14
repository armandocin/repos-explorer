import type {Repository} from '../repositories'

export interface GitHubSearchResponse {
  total_count: number
  incomplete_results: boolean
  items: Repository[]
}
