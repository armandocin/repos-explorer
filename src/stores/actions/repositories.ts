import type { GitHubSearchResponse } from '../../types/api/search.ts'
import type { RootState } from '../store.ts'
import type { Repository } from '../../types/repositories/repository.ts'
import type { Contributor } from '../../types/users/user.ts'

import { createAsyncThunk } from '@reduxjs/toolkit'

import { searchRepositories as searchReposApiRequest } from '../../api/endpoints/search.ts'
import { fetchContributors, fetchRepository } from '../../api/endpoints/repos.ts'

/* ====== Async thunks ====== */
export const loadRepository = createAsyncThunk(
  'repositories/fetchOwnerRepository',
  async ({ owner, repo }: { owner: string; repo: string }): Promise<Repository> => {
    return fetchRepository(owner, repo)
  }
)

export const loadRepoContributors = createAsyncThunk(
  'repositories/fetchRepoContributors',
  async ({ owner, repo }: { owner: string; repo: string }): Promise<Contributor[]> => {
    return fetchContributors(owner, repo, { per_page: '10' })
  }
)

export const searchRepositories = createAsyncThunk(
  'repositories/search',
  (query: string, { getState }): Promise<GitHubSearchResponse> => {
    const state = getState() as RootState
    const { currentPage, perPage } = state.repositories
    return searchReposApiRequest({ q: query, page: String(currentPage), per_page: String(perPage)  })
  }
)

export const fetchOwnerRepositories = createAsyncThunk(
  'repositories/fetchOwnerList',
  () => {
    // fech repositories by owner
    return Promise.resolve([])
  }
)
