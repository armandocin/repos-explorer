import { useMemo } from 'react'

interface UsePaginationRangeProps {
  currentPage: number
  totalCount: number
  pageSize: number
  siblingCount?: number // How many pages show on the sides of the current page
}

/**
 * Generates a range of page numbers for pagination, including optional boundary and sibling ranges,
 * bounded by potential ellipsis ("...") placeholders for large ranges.
 *
 * @param {Object} params - The parameters for calculating the pagination range.
 * @param {number} params.currentPage - The current active page in the pagination.
 * @param {number} params.totalCount - The total number of items across all pages.
 * @param {number} params.pageSize - The number of items per individual page.
 * @param {number} [params.siblingCount=1] - The number of sibling pages to show on either side
 * of the current page in the pagination range.
 *
 * @returns {(number|string)[]} An array representing the range of pages for pagination.
 * This may include numbers for page indices and strings ("...") representing gaps for larger ranges.
 */
const usePaginationRange = ({
  currentPage,
  totalCount,
  pageSize,
  siblingCount = 1
}: UsePaginationRangeProps): (number | string)[] => {
  return useMemo(() => {
    const totalPages = Math.ceil(totalCount / pageSize)

    // Total numbers of buttons to show (dots included)
    const totalPageNumbers = siblingCount * 2 + 5 // first + last + current + 2*siblings + 2 * separators

    // Case 1: few pages will fit, so show them all
    if (totalPageNumbers >= totalPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    // calculate lowest and highest siblings index
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages) // pick the computed value only if is smaller than last page

    // show separators only when there is more than one page number to be inserted between the lowest sibling and the pages bounds.
    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2

    const firstPageIndex = 1
    const lastPageIndex = totalPages

    // Case 2: Show only right dots
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount
      const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1)
      return [...leftRange, '...', totalPages]
    }

    // Case 3: Show only left dots
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount
      const rightRange = Array.from(
        { length: rightItemCount },
        (_, i) => totalPages - rightItemCount + i + 1
      )
      return [firstPageIndex, '...', ...rightRange]
    }

    // Caso 4: Show dots on both sides
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i
      )
      return [firstPageIndex, '...', ...middleRange, '...', lastPageIndex]
    }

    return []
  }, [currentPage, totalCount, siblingCount])
}

export default usePaginationRange
