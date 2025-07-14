import type {SearchState} from '../../../types/repositories/search'
import {searchRepositories} from '../../../api/repositories/search.ts'

async function searchAction(
  prevState: SearchState,
  formData: FormData
): Promise<SearchState> {
  const query = formData.get('query')

  if (typeof query !== 'string') {
    throw Error('Error parsing input')
  }

  if (!query?.trim()) {
    return {
      ...prevState,
      lastQuery: ''
    }
  }

  try {
    // TODO dispatch
    const response = await searchRepositories({ q: query })

    const { items, total_count } = response

    return {
      repositories: items,
      count: total_count,
      error: null,
      lastQuery: query
    }
  } catch (error) {
    return {
      repositories: [],
      count: 0,
      error: 'Failed to search repositories. Please try again.',
      lastQuery: query
    }
  }
}

export default searchAction
