import { useLoaderData } from 'react-router-dom'

import { Suspense } from 'react'
import RepositoryDetails from '../../components/repositories/details/RepositoryDetails.tsx'

const Repository = () => {
  const { loadingRepository } = useLoaderData()

  return (
    <div className='Container'>
      {/* TODO replace with skeleton */}
      <Suspense fallback='Loading...'>
        <RepositoryDetails
          loadingData={loadingRepository}
        />
      </Suspense>
    </div>
  )
}

export default Repository
