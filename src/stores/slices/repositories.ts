import {createAsyncThunk, createSlice, type PayloadAction} from '@reduxjs/toolkit'
import type {Repository} from '../../types/repositories'
import { searchRepositories as searchReposApiRequest } from '../../api/repositories/search.ts'
import type {GitHubSearchResponse} from '../../types/api/search.ts'

interface RepositoriesState {
  items: Repository[],
  totalCount: number,
  isLoading: boolean
}

const initialState: RepositoriesState = {
  items: [],
  totalCount: 0,
  isLoading: false
}

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
        state.items = action.payload.items
        state.totalCount = action.payload.total_count
      })
      .addCase(searchRepositories.rejected, (state) => {
        state.isLoading = false
      })
  },
  selectors: {
    selectRepositories: state => state.items
  }
})

export const { clearRepositories } = repositoriesSlice.actions
export const { selectRepositories } = repositoriesSlice.selectors
export default repositoriesSlice.reducer
