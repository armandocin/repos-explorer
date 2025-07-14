import type {Repository} from '../index.ts'

export interface SearchState {
  repositories: Repository[],
  count: number,
  error: string | null
  lastQuery: string
}
