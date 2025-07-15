import React, { type JSX, useActionState } from 'react'

import SearchForm from './SearchForm.tsx'
import {searchRepositories} from '../../../stores/slices/repositories.ts'
import {useAppDispatch, useAppSelector} from '../../../hooks/store.ts'

export interface SearchState {
  error: string | null
  lastQuery: string
}

const INITIAL_SEARCH_STATE: SearchState = {
  error: null,
  lastQuery: ''
}

const SearchRepositories: React.FC = (): JSX.Element => {
  /* REDUX STORE */
  const { items: repositories, totalCount } = useAppSelector(state => state.repositories)

  /* HOOKS */
  const [state, formAction] = useActionState(handleSearchAction, INITIAL_SEARCH_STATE)
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

  return (
    <div className='SearchRepositories'>
      <SearchForm
        action={formAction}
      />

      {state.error && (
        <div className='error-message' role='alert'>
          {state.error}
        </div>
      )}

      <div className='results-container'>
        {repositories.length > 0
            ? (
            <>
              <h2 className='results-title'>
                Found {totalCount} repositories for '{state.lastQuery}'
              </h2>
              <ul className='repository-list'>
                {repositories
                  .map((repo) => (
                    JSON.stringify(repo)
                  ))
                }
              </ul>
            </>
          )
          : state.lastQuery && !state.error
            ? (
              <p>No repositories found for '{state.lastQuery}'</p>
            )
            : null
        }
      </div>
    </div>
  )
}

export default SearchRepositories