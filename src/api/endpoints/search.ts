import type {RequestParams} from '../../types/api/common.ts'
import type {GitHubSearchResponse} from '../../types/api/search.ts'

import {apiWrapper} from '../utils.ts'
import keysToCamel from '../../utils/keysToCamel/keysToCamel.ts'

/*
  Contains all /search endpoints
*/

export const searchRepositories = (params: RequestParams): Promise<GitHubSearchResponse> =>
  apiWrapper(
    'get',
    'search',
    {
      path: 'repositories',
      params
    }
  ).then(async response => {
    const json = await response.json()
    return keysToCamel(json) as GitHubSearchResponse
  })
