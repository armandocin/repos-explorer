import {apiWrapper} from '../utils.ts'
import type {RequestParams} from '../../types/api/common.ts'
import type {GitHubSearchResponse} from '../../types/api/search.ts'

export const searchRepositories = (params: RequestParams): Promise<GitHubSearchResponse> =>
  apiWrapper(
    'get',
    'search',
    {
      path: 'repositories',
      params
    }
  ).then(response => response.json())
