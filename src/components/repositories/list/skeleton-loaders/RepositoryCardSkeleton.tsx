import { type JSX } from 'react'
import SkeletonLoader from '../../../../@styleguide/components/SkeletonLoader/SkeletonLoader'
import {
  mediaPatterns,
  textPatterns
} from '../../../../@styleguide/components/SkeletonLoader/skeleton-patterns.ts'
import './RepositoryCardSkeleton.css'

/**
 * RepositoryCardSkeleton is a placeholder component that displays a loading
 * skeleton while repository data is being fetched. It mimics the layout
 * of the actual RepositoryCard component using the SkeletonLoader component.
 *
 * @returns {JSX.Element} A JSX element representing the skeleton card.
 */
const RepositoryCardSkeleton = (): JSX.Element => {
  return (
    <article className='RepoCard RepoCard--skeleton' aria-label='Loading repository'>
      <div className='RepoCard__header'>
        <SkeletonLoader
          className='RepoCard__avatar'
          {...mediaPatterns.avatar}
        />
        <div className='RepoCard__header-info'>
          <h3 className='RepoCard__title'>
            <SkeletonLoader {...textPatterns.subheading} />
          </h3>
          <div className='RepoCard__owner'>
            <SkeletonLoader {...textPatterns.caption} />
          </div>
        </div>
      </div>

      <div className='RepoCard__description'>
        <SkeletonLoader {...textPatterns.paragraph} />
      </div>

      <div className='RepoCard__footer'>
        <div className='RepoCard__meta'>
          <SkeletonLoader {...textPatterns.caption} width={60} />
          <SkeletonLoader {...textPatterns.caption} width={80} />
        </div>
      </div>
    </article>
  )
}

export default RepositoryCardSkeleton
