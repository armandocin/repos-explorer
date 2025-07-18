import React, {
  type JSX,

  useCallback, useEffect
} from 'react'
import useSearchRepositories from '../../../hooks/repositories/search/useSearchRepositories.ts'

import { Text } from '../../../@styleguide'
import SearchForm from './SearchForm.tsx'
import RepositoriesList from '../list/RepositoriesList.tsx'
import WrapWithLoader from '../../common/skeleton-loaders/WrapWithLoader.tsx'
import PaginationNavbar from '../../common/pagination/PaginationNavbar.tsx'

import './SearchRepositories.css'

/**
 * SearchRepositories is a React functional component that provides a user interface for searching and displaying a list of repositories.
 * It includes features such as pagination, displaying error messages, and handling loading states.
 *
 * Functionalities:
 * - Allows users to search for repositories through a search form.
 * - Handles the rendering logic and passes the information to the subcomponents with specialized responsibilities
 *
 * State and Handlers:
 * - Utilizes hooks from `useSearchRepositories` to manage state variables such as `repositories`, `totalCount`, `currentPage`, and `perPage`.
 * - Wraps the function to fetch the repositories getting the page to pass.
 * - Implements a side-effect to scroll to the top of the page when the current page changes.
 *
 * Render Logic:
 * - Shows a loading indicator while results are being fetched.
 * - Displays the list of repositories if available, otherwise an appropriate message for empty or error states.
 * - Allows the user to navigate between pages when repositories are paginated.
 */
const SearchRepositories: React.FC = (): JSX.Element => {
  /* HOOKS */
  const {
    repositories,
    totalCount,
    currentPage,
    perPage,

    lastQuery,
    error,
    isLoading,
    getRepositoriesByQuery,
  } = useSearchRepositories()

  /* HANDLERS */
  const handlePageChange = useCallback(async (page: number) => {
    if (!lastQuery) return

    try {
      await getRepositoriesByQuery(lastQuery, page)
    } catch (err) {
      console.error('Failed to change page:', err)
    }
  }, [lastQuery])

  /* EFFECTS */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentPage])

  /* RENDER VARIABLES */
  const showEmptyState = lastQuery && !isLoading && !totalCount && !error

  return (
    <div className='SearchRepositories'>
      <SearchForm isLoading={isLoading} onSubmit={getRepositoriesByQuery} />

      {error && !isLoading && (
        <div className='SearchRepositories__error-message' role='alert'>
          {error}
        </div>
      )}

      <div className='SearchRepositories__results-container'>
        <WrapWithLoader isLoading={isLoading} width='300px' height='20px' variant='rounded' className='SearchRepositories__results-title'>
          {repositories.length > 0 &&
            <h2 className='SearchRepositories__results-title'>
              Found {totalCount} repositories for "{lastQuery}"
            </h2>
          }
        </WrapWithLoader>

        <RepositoriesList list={repositories} isLoading={isLoading} />

        {!showEmptyState && !error && repositories.length > 0 && (
          <PaginationNavbar
            currentPage={currentPage}
            totalCount={totalCount}
            perPage={perPage}
            onPageChange={handlePageChange}
            disabled={isLoading}
          />
        )}

        {showEmptyState && (
          <Text className='SearchRepositories__no-results' size='intermediate'>
            No repositories found for '{lastQuery}'. ☹️<br />
            Don't give up, you can try again!
          </Text>
        )}
      </div>
    </div>
  )
}

export default SearchRepositories