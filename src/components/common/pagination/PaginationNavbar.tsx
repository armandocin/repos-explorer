import { type JSX } from 'react'

import usePagination from '../../../hooks/common/pagination/usePagination.ts'

import './PaginationNavbar.css'

interface PaginationNavbarProps {
  currentPage: number
  totalCount: number
  perPage: number
  onPageChange: (page: number) => Promise<void>,
  disabled?: boolean
}

/**
 * PaginationNavbar is a functional component that renders a pagination navigation bar.
 * It allows users to navigate between pages of data using previous/next buttons or page number buttons.
 *
 * @param {Object} props - The props that configure the component.
 * @param {number} props.currentPage - The current active page.
 * @param {number} props.totalCount - The total count of items.
 * @param {number} props.perPage - The number of items per page.
 * @param {function} props.onPageChange - A callback function triggered when the page changes. It receives the new page number as an argument.
 * @param {boolean} [props.disabled=false] - A boolean indicating whether the pagination navigation should be disabled.
 *
 * @returns {JSX.Element|null} The rendered JSX markup for the pagination navigation bar, or null if no pages are available to display.
 */
const PaginationNavbar = ({
  currentPage,
  totalCount,
  perPage,
  onPageChange,
  disabled = false
}: PaginationNavbarProps): JSX.Element | null => {
  const pagesRanges = usePagination({ currentPage, totalCount, pageSize: perPage })

  return (
    <nav className='PaginationNavbar' aria-label='Pagination Navigation'>
      <button
        className='PaginationNavbar__arrow'
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || disabled}
        aria-label='Go to previous page'
      >
        ←
      </button>

      <div className='PaginationNavbar__pages'>
        {pagesRanges.map((pageNumber, index) => {
          if (pageNumber === '...') {
            return (
              <span
                key={`dots-${index}`}
                className='PaginationNavbar__dots'
              >
                ...
              </span>
            )
          }

          return (
            <button
              key={`pagination-navbar-btn-${pageNumber}`}
              className={`PaginationNavbar__page ${
                currentPage === pageNumber ? 'PaginationNavbar__page--active' : ''
              }`}
              onClick={() => onPageChange(Number(pageNumber))}
              disabled={disabled || currentPage === pageNumber}
              aria-label={`Go to page ${pageNumber}`}
              aria-current={currentPage === pageNumber ? 'page' : undefined}
            >
              {pageNumber}
            </button>
          )
        })}
      </div>

      <button
        className='PaginationNavbar__arrow'
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === pagesRanges?.length || disabled}
        aria-label='Go to next page'
      >
        →
      </button>
    </nav>
  )
}

export default PaginationNavbar
