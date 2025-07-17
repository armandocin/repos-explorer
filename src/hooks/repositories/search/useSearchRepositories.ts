import { useState, useCallback } from 'react'
import {useAppDispatch} from '../../store.ts'

import {searchRepositories, setPage} from '../../../stores/slices/repositories.ts'

interface UseSearchFormReturn {
  lastQuery: string
  error: string | null
  isLoading: boolean
  onSubmit: (query: string, page?: number) => Promise<void>
}

/**
 * A custom hook to manage the search functionality for repositories.
 *
 * @param {string} [initialQuery=''] - The initial query to populate the search input.
 * @returns {UseSearchFormReturn} An object containing the current query state, error state, loading state, and a submission handler function.
 *
 * @property {string} lastQuery - The last submitted search query.
 * @property {string|null} error - The error message if the search operation fails, otherwise null.
 * @property {boolean} isLoading - Indicates whether a search request is currently in progress.
 * @property {function} onSubmit - A callback function to handle search form submission. It accepts a search query string and an optional page number.
 */
const useSearchRepositories = (initialQuery: string = ''): UseSearchFormReturn => {
  const [lastQuery, setLastQuery] = useState(initialQuery)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useAppDispatch()

  const onSubmit = useCallback(async (query: string, page: number = 1) => {
    const isNewQuery = query !== lastQuery

    if (!query.trim()) return

    setError(null)
    setIsLoading(true)

    if (isNewQuery) {
      setLastQuery(query)
    }

    try {
      dispatch(setPage(page))

      await dispatch(searchRepositories(query)).unwrap()
    } catch (err) {
      console.error(err) // should be logged somewhere
      setError('Failed to search repositories. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [dispatch, lastQuery])

  return {
    lastQuery,
    error,
    isLoading,
    onSubmit
  }
}

export default useSearchRepositories
