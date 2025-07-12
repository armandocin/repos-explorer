import React, { type JSX, useActionState } from 'react'

import SearchForm from './SearchForm.tsx'

import searchAction from '../../actions/searchRepositories.ts'

const SearchRepositories: React.FC = (): JSX.Element => {
  /* HOOKS */
  const [state, formAction] = useActionState(searchAction, {
    repositories: [],
    error: null,
    lastQuery: ''
  })

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
                Found {state.repositories.length} repositories for '{state.lastQuery}'
              </h2>
              <ul className='repository-list'>
                {/*{state.repositories
                  .map((repo) => (
                  ))
                }*/}
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