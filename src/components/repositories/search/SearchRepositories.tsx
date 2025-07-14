import React, { type JSX, useActionState } from 'react'
import type { SearchState } from '../../../types/repositories/search'

import SearchForm from './SearchForm.tsx'

import searchAction from '../../../actions/repositories/search/searchRepositories.ts'

const INITIAL_SEARCH_STATE: SearchState = {
  repositories: [], // TODO move in redux store
  count: 0,
  error: null,
  lastQuery: ''
}

const SearchRepositories: React.FC = (): JSX.Element => {
  /* HOOKS */
  const [state, formAction] = useActionState(searchAction, INITIAL_SEARCH_STATE)

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
        {state.repositories.length > 0
            ? (
            <>
              <h2 className='results-title'>
                Found {state.count} repositories for '{state.lastQuery}'
              </h2>
              <ul className='repository-list'>
                {state.repositories
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