import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
  type PayloadAction,
  type EntityAdapter
} from '@reduxjs/toolkit'

import type {Repository} from '../../types/repositories/repository.ts'
import type {GitHubSearchResponse} from '../../types/api/search.ts'
import type {RootState} from '../store.ts'

import { searchRepositories as searchReposApiRequest } from '../../api/repositories/search.ts'

interface RepositoriesState {
  entities: Record<number, Repository>,
  ids: number[],
  totalCount: number,
  isLoading: boolean
}

/* ===== Normalizer ====== */
export const repositoriesAdapter: EntityAdapter<Repository, number> = createEntityAdapter<Repository>()

const initialState: RepositoriesState = repositoriesAdapter.getInitialState({
  totalCount: 0,
  isLoading: false
})

/* ====== Async thunks ====== */
export const searchRepositories = createAsyncThunk(
  'repositories/search',
  (query: string): Promise<GitHubSearchResponse> => searchReposApiRequest({q: query})
)


/* ====== Create store slice ====== */
const repositoriesSlice = createSlice({
  name: 'repositories',
  initialState,
  reducers: {
    clearRepositories: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchRepositories.pending, (state) => {
        state.isLoading = true
      })
      .addCase(searchRepositories.fulfilled, (state, action: PayloadAction<GitHubSearchResponse>) => {
        state.isLoading = false
        state.totalCount = action.payload.totalCount
        repositoriesAdapter.setAll(state, action.payload.items)
      })
      .addCase(searchRepositories.rejected, (state) => {
        state.isLoading = false
      })
  }
})

/* ===== Selectors ===== */
const globalizedSelectors = repositoriesAdapter.getSelectors(
  (state: RootState) => state.repositories
)

export const { clearRepositories } = repositoriesSlice.actions
export const { selectAll: selectRepositories } = globalizedSelectors
export default repositoriesSlice.reducer
