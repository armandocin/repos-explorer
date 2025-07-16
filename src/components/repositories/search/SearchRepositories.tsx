import React, { type JSX, useActionState } from 'react'

import {useAppDispatch, useAppSelector} from '../../../hooks/store.ts'

import {searchRepositories, selectRepositories} from '../../../stores/slices/repositories.ts'

import SearchForm from './SearchForm.tsx'
import RepositoriesList from '../list/RepositoriesList.tsx'
import WrapWithLoader from '../../common/skeleton-loaders/WrapWithLoader.tsx'

import './SearchRepositories.css'

export interface SearchState {
  error: string | null
  lastQuery: string
}

const INITIAL_SEARCH_STATE: SearchState = {
  error: null,
  lastQuery: ''
}

/**
 * SearchRepositories is a React functional component used for searching and displaying repositories.
 * It integrates with a Redux store to manage the state of repositories, handles form-based user input,
 * and displays search results or relevant messages based on the search query and results.
 *
 * Features:
 * - Accepts user input via a search form to query repositories.
 * - Displays the total count of repositories and a list of results if found.
 * - Provides feedback on invalid search inputs or errors during the search process.
 * - Shows appropriate messages for no results or failed search attempts.
 *
 * Hooks/Redux:
 * - Uses `useAppSelector` to access the `totalCount` and `repositories` state from the Redux store.
 * - Implements `useActionState` for managing the search action state and handling form submission.
 * - Dispatches the `searchRepositories` action to fetch repository data based on the user's query.
 *
 * Error Handling:
 * - Displays an error message if the search action fails or if the user provides invalid input.
 *
 * Returns:
 * - A JSX element rendering the search form, search results, and error or informational messages.
 */
const SearchRepositories: React.FC = (): JSX.Element => {
  /* REDUX STORE */
  const totalCount = useAppSelector(state => state.repositories.totalCount)
  const repositories = useAppSelector(selectRepositories)

  /* HOOKS */
  const [state, formAction, isLoading] = useActionState(handleSearchAction, INITIAL_SEARCH_STATE)
  const dispatch = useAppDispatch()

  /* HANDLERS */
  async function handleSearchAction (
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
      await dispatch(searchRepositories(query))

      return {
        error: null,
        lastQuery: query
      }
    } catch (error) {
      console.error(error) // Should be logged somewhere
      return {
        error: 'Failed to search repositories. Please try again.',
        lastQuery: query
      }
    }
  }

  const showEmptyState = state.lastQuery && !isLoading && !totalCount && !state.error

  return (
    <div className='SearchRepositories'>
      <form action={formAction}>
        <SearchForm />
      </form>

      {state.error && !isLoading && (
        <div className='SearchRepositories__error-message' role='alert'>
          {state.error}
        </div>
      )}

      <div className='SearchRepositories__results-container'>
        <WrapWithLoader isLoading={isLoading} width='300px' height='20px' variant='rounded' className='SearchRepositories__results-title'>
          {repositories.length > 0 &&
            <h2 className='SearchRepositories__results-title'>
              Found {totalCount} repositories for "{state.lastQuery}"
            </h2>
          }
        </WrapWithLoader>
        <RepositoriesList list={repositories} isLoading={isLoading} />

        {showEmptyState
          ? (
            <p className='SearchRepositories__no-results'>
              No repositories found for '{state.lastQuery}'. ☹️<br />
              Don't give up, you can try again!
            </p>
          )
          : null
        }
      </div>
    </div>
  )
}

export default SearchRepositories