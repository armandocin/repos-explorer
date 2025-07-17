import { renderHook } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import usePagination from './usePagination'

describe('usePaginationRange', () => {
  it('should return all pages when total pages is small', () => {
    const { result } = renderHook(() =>
      usePagination({
        currentPage: 1,
        totalCount: 50,
        pageSize: 10,
        siblingCount: 1
      })
    )

    expect(result.current).toEqual([1, 2, 3, 4, 5])
  })

  it('should show only right dots when on first pages', () => {
    const { result } = renderHook(() =>
      usePagination({
        currentPage: 2,
        totalCount: 200,
        pageSize: 10,
        siblingCount: 1
      })
    )

    expect(result.current).toEqual([1, 2, 3, 4, 5, '...', 20])
  })

  it('should show only left dots when on last pages', () => {
    const { result } = renderHook(() =>
      usePagination({
        currentPage: 19,
        totalCount: 200,
        pageSize: 10,
        siblingCount: 1
      })
    )

    expect(result.current).toEqual([1, '...', 16, 17, 18, 19, 20])
  })

  it('should show dots on both sides when in middle', () => {
    const { result } = renderHook(() =>
      usePagination({
        currentPage: 10,
        totalCount: 200,
        pageSize: 10,
        siblingCount: 1
      })
    )

    expect(result.current).toEqual([1, '...', 9, 10, 11, '...', 20])
  })

  it('should respect different siblingCount values', () => {
    const { result } = renderHook(() =>
      usePagination({
        currentPage: 10,
        totalCount: 300,
        pageSize: 10,
        siblingCount: 2
      })
    )

    expect(result.current).toEqual([1, '...', 8, 9, 10, 11, 12, '...', 30])
  })

  it('should handle first page correctly', () => {
    const { result } = renderHook(() =>
      usePagination({
        currentPage: 1,
        totalCount: 100,
        pageSize: 10,
        siblingCount: 1
      })
    )

    expect(result.current).toEqual([1, 2, 3, 4, 5, '...', 10])
  })

  it('should handle last page correctly', () => {
    const { result } = renderHook(() =>
      usePagination({
        currentPage: 10,
        totalCount: 100,
        pageSize: 10,
        siblingCount: 1
      })
    )

    expect(result.current).toEqual([1, '...', 6, 7, 8, 9, 10])
  })

  it('should handle single page', () => {
    const { result } = renderHook(() =>
      usePagination({
        currentPage: 1,
        totalCount: 5,
        pageSize: 10,
        siblingCount: 1
      })
    )

    expect(result.current).toEqual([1])
  })

  it('should handle zero results', () => {
    const { result } = renderHook(() =>
      usePagination({
        currentPage: 1,
        totalCount: 0,
        pageSize: 10,
        siblingCount: 1
      })
    )

    expect(result.current).toEqual([])
  })

  it('should work with siblingCount = 0', () => {
    const { result } = renderHook(() =>
      usePagination({
        currentPage: 5,
        totalCount: 100,
        pageSize: 10,
        siblingCount: 0
      })
    )

    expect(result.current).toEqual([1, '...', 5, '...', 10])
  })

  it('should update when props change', () => {
    const { result, rerender } = renderHook(
      ({ currentPage }) => usePagination({
        currentPage,
        totalCount: 150,
        pageSize: 10,
        siblingCount: 1
      }),
      { initialProps: { currentPage: 1 } }
    )

    expect(result.current).toEqual([ 1, 2, 3, 4, 5, '...', 15 ])

    rerender({ currentPage: 8 })
    expect(result.current).toEqual([1, '...', 7, 8, 9, '...', 15])
  })

  it('should not show left dots when leftSiblingIndex equals 2', () => {
    const { result } = renderHook(() =>
      usePagination({
        currentPage: 3,
        totalCount: 100,
        pageSize: 10,
        siblingCount: 1
      })
    )

    expect(result.current).toEqual([ 1, 2, 3, 4, 5, '...', 10 ])
  })

  it('should not show right dots when rightSiblingIndex equals totalPages - 2', () => {
    const { result } = renderHook(() =>
      usePagination({
        currentPage: 8,
        totalCount: 100,
        pageSize: 10,
        siblingCount: 1
      })
    )

    expect(result.current).toEqual([ 1, '...', 6, 7, 8, 9, 10 ])
  })

  it('should handle large page counts', () => {
    const { result } = renderHook(() =>
      usePagination({
        currentPage: 50,
        totalCount: 10000,
        pageSize: 10,
        siblingCount: 1
      })
    )

    expect(result.current).toEqual([1, '...', 49, 50, 51, '...', 1000])
  })

  it('should memoize results correctly', () => {
    const { result, rerender } = renderHook(
      (props) => usePagination(props),
      {
        initialProps: {
          currentPage: 5,
          totalCount: 100,
          pageSize: 10,
          siblingCount: 1
        }
      }
    )

    const firstResult = result.current

    rerender({
      currentPage: 5,
      totalCount: 100,
      pageSize: 10,
      siblingCount: 1
    })

    expect(result.current).toBe(firstResult)
  })
})