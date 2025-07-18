import { type JSX } from 'react'
import {
  SkeletonLoader,
  mediaPatterns,
  textPatterns,
  interactivePatterns
} from '../../../../@styleguide'
import './RepositoryDetailsSkeleton.css'

/**
 * RepositoryDetailsSkeleton is a placeholder component that displays a loading
 * skeleton while repository details are being fetched. It mimics the layout
 * of the actual RepositoryDetails component.
 *
 * @returns {JSX.Element} A JSX element representing the skeleton view.
 */
const RepositoryDetailsSkeleton = (): JSX.Element => {
  return (
    <div className='RepositoryDetails RepositoryDetails--skeleton'>
      <header className='RepositoryDetails__header'>
        <div className='RepositoryDetails__header-main-info'>
          {/* Back button skeleton */}
          <SkeletonLoader
            {...interactivePatterns.buttonLarge}
            width={48}
            className='RepositoryDetails__back--skeleton'
          />

          <div className='RepositoryDetails__heading'>
            <h1>
              {/* Avatar skeleton */}
              <SkeletonLoader
                {...mediaPatterns.avatarLarge}
              />
              {/* Repository name skeleton */}
              <SkeletonLoader
                {...textPatterns.heading}
                width={300}
              />
            </h1>

            {/* Visibility badge skeleton */}
            <SkeletonLoader
              variant='rounded'
              width={70}
              height={32}
            />
          </div>
        </div>

        {/* Description skeleton */}
        <div className='RepositoryDetails__description'>
          <SkeletonLoader
            {...textPatterns.paragraph}
            lines={2}
            width='80%'
          />
        </div>

        {/* Topics skeleton */}
        <div className='RepositoryDetails__topics'>
          <SkeletonLoader
            variant='rounded'
            width={80}
            height={24}
          />
          <SkeletonLoader
            variant='rounded'
            width={100}
            height={24}
          />
          <SkeletonLoader
            variant='rounded'
            width={70}
            height={24}
          />
        </div>
      </header>

      {/* Stats section skeleton */}
      <section className='RepositoryDetails__stats'>
        {[1, 2, 3, 4].map(index => (
          <div key={index} className='RepositoryDetails__stats-card RepositoryDetails__stats-card--skeleton'>
            <span className='RepositoryDetails__stats-icon'>
              <SkeletonLoader
                variant='circular'
                width={32}
                height={32}
              />
            </span>
            <div>
              <div className='RepositoryDetails__stats-value'>
                <SkeletonLoader
                  variant='text'
                  width={80}
                  height={28}
                />
              </div>
              <div className='RepositoryDetails__stats-label'>
                <SkeletonLoader
                  {...textPatterns.caption}
                  width={60}
                />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Info section skeleton */}
      <section className='RepositoryDetails__info'>
        <div className='RepositoryDetails__info-grid'>
          {[1, 2, 3, 4].map(index => (
            <div key={index} className='RepositoryDetails__info-item'>
              <span className='RepositoryDetails__info-label'>
                <SkeletonLoader
                  {...textPatterns.caption}
                  width={100}
                />
              </span>
              <span className='RepositoryDetails__info-value'>
                <SkeletonLoader
                  variant='text'
                  width={150}
                  height={20}
                />
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default RepositoryDetailsSkeleton
