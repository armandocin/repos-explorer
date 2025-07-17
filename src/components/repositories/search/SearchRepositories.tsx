import React, {
  type JSX,

  useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/store.ts'
import useSearchRepositories from '../../../hooks/repositories/search/useSearchRepositories.ts'

import { selectRepositories } from '../../../stores/slices/repositories.ts'

import Text from '../../../@styleguide/components/Text/Text.tsx'
import SearchForm from './SearchForm.tsx'
import RepositoriesList from '../list/RepositoriesList.tsx'
import WrapWithLoader from '../../common/skeleton-loaders/WrapWithLoader.tsx'
import PaginationNavbar from '../../common/pagination/PaginationNavbar.tsx'

import './SearchRepositories.css'

/**
 * SearchRepositories is a React functional component that provides an interface
 * for users to search for repositories. It integrates with a Redux store for
 * state management and makes use of custom hooks to handle repository search logic.
 * The component displays search results, error messages, and allows pagination
 * of the results.
 *
 * Features:
 * - Search form for entering repository queries.
 * - Displays loading state while fetching data.
 * - Handles errors during the search process.
 * - Displays a list of repositories matching the search query.
 * - Pagination for browsing through search results.
 * - Shows an empty state message when no repositories match the query.
 */
const SearchRepositories: React.FC = (): JSX.Element => {
  /* REDUX STORE */
  const repositories = useAppSelector(selectRepositories)
  const { totalCount, currentPage, perPage } = useAppSelector(state => state.repositories)
  const dispatch = useAppDispatch()

  /* HOOKS */
  const { lastQuery, error, isLoading, onSubmit } = useSearchRepositories()

  /* HANDLERS */
  const handlePageChange = useCallback(async (page: number) => {
    if (!lastQuery) return

    try {
      await onSubmit(lastQuery, page)
    } catch (err) {
      console.error('Failed to change page:', err)
    }
  }, [dispatch, lastQuery])

  /* RENDER VARIABLES */
  const showEmptyState = lastQuery && !isLoading && !totalCount && !error

  return (
    <div className='SearchRepositories'>
      <SearchForm isLoading={isLoading} onSubmit={onSubmit} />

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