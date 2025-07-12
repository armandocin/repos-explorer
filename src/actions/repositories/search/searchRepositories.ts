import type {SearchState} from '../../../types/repositories/search'

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
    // TODO: replace
    const response = await fetch(`${encodeURIComponent(query)}`)

    const data = await response.json()

    return {
      repositories: data,
      error: null,
      lastQuery: query
    }
  } catch (error) {
    return {
      repositories: [],
      error: 'Failed to search repositories. Please try again.',
      lastQuery: query
    }
  }
}

export default searchAction
