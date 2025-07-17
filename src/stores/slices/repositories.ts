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

import config from '../../config'

interface RepositoriesState {
  entities: Record<number, Repository>,
  ids: number[],
  totalCount: number,
  isLoading: boolean,
  currentPage: number,
  perPage: number
}

/* ===== Normalizer ====== */
export const repositoriesAdapter: EntityAdapter<Repository, number> = createEntityAdapter<Repository>()

const initialState: RepositoriesState = repositoriesAdapter.getInitialState({
  totalCount: 0,
  isLoading: false,
  currentPage: 1,
  perPage: config.pageSize
})

/* ====== Async thunks ====== */
export const searchRepositories = createAsyncThunk(
  'repositories/search',
  (query: string, { getState }): Promise<GitHubSearchResponse> => {
    const state = getState() as RootState
    const { currentPage, perPage } = state.repositories
    return searchReposApiRequest({ q: query, page: String(currentPage), per_page: String(perPage)  })
  }
)


/* ====== Create store slice ====== */
const repositoriesSlice = createSlice({
  name: 'repositories',
  initialState,
  reducers: {
    clearRepositories: () => initialState,
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = Number(action.payload)
    }
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

export const { clearRepositories, setPage } = repositoriesSlice.actions
export const { selectAll: selectRepositories } = globalizedSelectors
export default repositoriesSlice.reducer
