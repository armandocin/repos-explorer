import type { Repository } from '../../../types/repositories/repository.ts'

import { useState, useCallback, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store.ts'

import { searchRepositories, selectRepositories, setPage } from '../../../stores/slices/repositories.ts'

interface UseSearchFormReturn {
  repositories: Repository[],
  totalCount: number,
  currentPage: number,
  perPage: number,
  lastQuery: string
  error: string | null
  isLoading: boolean
  getRepositoriesByQuery: (query: string, page?: number) => Promise<void>
}

/**
 * A custom hook for interacting with a repository search functionality.
 *
 * This hook provides state management and logic for searching repositories,
 * leveraging local state, URL parameters, and Redux store integration.
 * It handles query submissions, coordinates with the Redux store,
 * and manages asynchronous search operations with error handling.
 *
 * @param {string} [initialQuery=''] - The initial search query, defaults to an empty string.
 * @returns {UseSearchFormReturn} An object containing state and handlers for repository search:
 * - `repositories` (Array): The list of repositories fetched from the API.
 * - `totalCount` (number): The total number of repositories available for the current search query.
 * - `perPage` (number): The number of repositories displayed per page.
 * - `currentPage` (number): The current pagination page.
 * - `lastQuery` (string): The last submitted search query.
 * - `error` (string|null): The error message, if a search operation fails.
 * - `isLoading` (boolean): Indicates whether a search operation is in progress.
 * - `onSubmit` (Function): A function to submit a repository search query and navigate to a specified page.
 */
const useSearchRepositories = (initialQuery: string = ''): UseSearchFormReturn => {
  const [searchParams, setSearchParams] = useSearchParams()

  /* LOCAL STATE */
  const [lastQuery, setLastQuery] = useState(initialQuery)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  /* REDUX STORE */
  const repositories = useAppSelector(selectRepositories)
  const { totalCount, currentPage, perPage } = useAppSelector(state => state.repositories)

  const dispatch = useAppDispatch()

  const getRepositoriesByQuery = useCallback(async (query: string, page: number = 1) => {
    const isNewQuery = query !== lastQuery

    if (!query.trim()) return

    setError(null)
    setIsLoading(true)

    if (isNewQuery) {
      setLastQuery(query)
    }

    try {
      dispatch(setPage(page))

      setSearchParams({ q: query, page: String(page) })

      await dispatch(searchRepositories(query)).unwrap()
    } catch (err) {
      console.error(err) // should be logged somewhere
      setError('Failed to search repositories. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [dispatch, lastQuery])

  useEffect(() => {
    if (!lastQuery) {
      const urlPage = parseInt(searchParams.get('page') || '1')
      const urlQuery = searchParams.get('q') || ''

      if (urlQuery && !lastQuery) {
        if (urlPage !== currentPage) {
          dispatch(setPage(urlPage))
        }

        getRepositoriesByQuery(urlQuery, urlPage)
      }
    }
  }, [lastQuery, currentPage, dispatch, getRepositoriesByQuery, searchParams])

  return {
    repositories,
    totalCount,
    perPage,
    currentPage,

    lastQuery,
    error,
    isLoading,
    getRepositoriesByQuery
  }
}

export default useSearchRepositories
