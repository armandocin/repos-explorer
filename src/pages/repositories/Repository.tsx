import { useLoaderData } from 'react-router-dom'

import { Suspense } from 'react'
import RepositoryDetails from '../../components/repositories/details/RepositoryDetails.tsx'
import RepositoryDetailsSkeleton from '../../components/repositories/details/skeleton-loaders/RepositoryDetailsSkeleton.tsx'

const Repository = () => {
  const { loadingRepository } = useLoaderData()

  return (
    <div className='Container'>
      <Suspense fallback={<RepositoryDetailsSkeleton />}>
        <RepositoryDetails
          loadingData={loadingRepository}
        />
      </Suspense>
    </div>
  )
}

export default Repository
