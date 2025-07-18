import type {Repository} from '../../types/repositories/repository.ts'
import type {GitHubSearchResponse} from '../../types/api/search.ts'
import type {RootState} from '../store.ts'

import {
  type PayloadAction,
  type EntityAdapter,

  isPending, isRejected,
  createSlice,
  createEntityAdapter,
  isAnyOf, isFulfilled
} from '@reduxjs/toolkit'

import { fetchOwnerRepositories, loadRepository, searchRepositories } from '../actions/repositories.ts'

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

      .addMatcher(isFulfilled(loadRepository), (state, action:PayloadAction<Repository>) => {
        repositoriesAdapter.upsertOne(state, action.payload)
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

export const { selectAll: selectRepositories, selectById: selectRepository } = globalizedSelectors
export default repositoriesSlice.reducer
