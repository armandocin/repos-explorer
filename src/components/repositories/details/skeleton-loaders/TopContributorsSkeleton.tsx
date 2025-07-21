import { SkeletonLoader, mediaPatterns, textPatterns } from '../../../../@styleguide'

const TopContributorsSkeleton = () => {
  return (
    <section className='RepositoryDetails__contributors'>
      <h4>Top Contributors</h4>
      <div className='RepositoryDetails__contributors-grid'>
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className='RepositoryDetails__contributors-item'>
            <div className='RepositoryDetails__contributors-avatar'>
              <SkeletonLoader {...mediaPatterns.avatar} />
            </div>
            <div className='RepositoryDetails__contributors-info'>
              <SkeletonLoader 
                variant='text'
                width='40%'
                height={16}
                style={{ marginBottom: '4px' }}
              />
              <SkeletonLoader 
                {...textPatterns.caption}
                width='60%'
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TopContributorsSkeleton