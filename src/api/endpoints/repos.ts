import type { RequestParams } from '../../types/api/common.ts'
import type { Repository } from '../../types/repositories/repository.ts'
import type { Contributor } from '../../types/users/user.ts'

import {apiWrapper} from '../utils.ts'
import keysToCamel from '../../utils/keysToCamel/keysToCamel.ts'

/*
  Contains all /repos endpoints
*/

export const fetchRepository = (owner: string, repo: string, params?: RequestParams): Promise<Repository> =>
  apiWrapper(
    'get',
    'repos',
    {
      path: `${owner}/${repo}`,
      params
    }
  ).then(async response => {
    const json = await response.json()
    return keysToCamel(json) as Repository
  })

export const fetchContributors = (owner: string, repo: string, params?: RequestParams): Promise<Contributor[]> =>
  apiWrapper(
    'get',
    'repos',
    {
      path: `${owner}/${repo}/contributors`,
      params
    }
  ).then(async response => {
    const json = await response.json()
    return keysToCamel(json) as Contributor[]
  })
