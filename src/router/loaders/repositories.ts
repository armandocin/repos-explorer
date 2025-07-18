import type { LoaderFunctionArgs } from 'react-router-dom'

import { store } from '../../stores/store'
import { unwrapResult } from '@reduxjs/toolkit'

import { loadRepository } from '../../stores/actions/repositories.ts'

export const repositoryDetailsLoader = async ({ params }: LoaderFunctionArgs) => {
  const { owner, repo } = params

  if (!owner || !repo) {
    throw new Response('Not Found', { status: 404 })
  }

  try {
    const loadingRepositoryPromise =  store.dispatch(loadRepository({ owner, repo }))
      .then(unwrapResult)
      .then(repository => repository.id)

    return { loadingRepository: loadingRepositoryPromise }
  } catch (error) {
    throw new Response('Failed to load repository', { status: 500 })
  }
}
