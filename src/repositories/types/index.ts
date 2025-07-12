export interface SearchState {
  repositories: Repository[]
  error: string | null
  lastQuery: string
}

export interface Repository {
  name: string
  url: string
}
