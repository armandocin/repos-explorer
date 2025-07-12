import type {Repository} from '../index.ts'

export interface SearchState {
  repositories: Repository[]
  error: string | null
  lastQuery: string
}
