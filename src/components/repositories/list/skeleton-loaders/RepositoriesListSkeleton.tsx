import { type JSX } from 'react'
import RepositoryCardSkeleton from './RepositoryCardSkeleton.tsx'

interface RepositoriesListSkeletonProps {
  count?: number
}

/**
 * RepositoriesListSkeleton displays a grid of skeleton cards while
 * repository data is being loaded. It uses the same layout as RepositoriesList.
 *
 * @param {RepositoriesListSkeletonProps} props - The properties passed to the component.
 * @param {number} [props.count=6] - Number of skeleton cards to display.
 * @returns {JSX.Element} A JSX element representing the skeleton list.
 */
const RepositoriesListSkeleton = ({ count = 6 }: RepositoriesListSkeletonProps): JSX.Element => {
  return (
    <div className='RepositoriesList' aria-busy='true' aria-label='Loading repositories'>
      {Array.from({ length: count }).map((_, index) => (
        <RepositoryCardSkeleton key={`skeleton-${index}`} />
      ))}
    </div>
  )
}

export default RepositoriesListSkeleton
