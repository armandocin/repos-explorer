import {
  type PayloadAction,
  type EntityAdapter,

  isPending, isRejected,
  createSlice,
  createEntityAdapter,
  createAsyncThunk, isAnyOf, isFulfilled
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

export const fetchOwnerRepositories = createAsyncThunk(
  'repositories/fetch',
  () => {
    // fech repositories by owner
    return Promise.resolve([])
  }
)

const pendingLoadingActions = isPending(searchRepositories, fetchOwnerRepositories)
const rejectedLoadingActions = isRejected(searchRepositories, fetchOwnerRepositories)
const fulfilledListOfReposActions = isFulfilled(fetchOwnerRepositories)


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
      .addMatcher(pendingLoadingActions, (state) => {
        state.isLoading = true
      })
      .addMatcher(rejectedLoadingActions, (state) => {
        state.isLoading = false
      })
      .addMatcher(isAnyOf(searchRepositories.fulfilled), (state, action: PayloadAction<GitHubSearchResponse>) => {
        state.isLoading = false
        state.totalCount = action.payload.totalCount
        repositoriesAdapter.setAll(state, action.payload.items)
      })
      .addMatcher(fulfilledListOfReposActions, (state, action: PayloadAction<Repository[]>) => {
        state.isLoading = false
        repositoriesAdapter.setAll(state, action.payload)
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
