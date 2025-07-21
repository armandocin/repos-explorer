import type { Contributor } from '../../../types/users/user.ts'
import { useEffect, useState } from 'react'
import { useAppDispatch } from '../../../hooks/store.ts'

import { loadRepoContributors } from '../../../stores/actions/repositories.ts'

import { Link } from 'react-router-dom'
import { Avatar, Text } from '../../../@styleguide'
import TopContributorsSkeleton from './skeleton-loaders/TopContributorsSkeleton.tsx'

import './TopContributors.css'

interface TopContributorsProps {
  owner: string
  repo: string
  contributors: Contributor[]
}

const TopContributors = ({ owner, repo, contributors = [] }: TopContributorsProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useAppDispatch()

  useEffect(() => {
    setIsLoading(true)
    dispatch(loadRepoContributors({ owner, repo }))
      .catch((err) => console.error('Failed to load contributors:', err))
      .finally(() => setIsLoading(false))

  }, [owner, repo, dispatch])

  if (isLoading || !contributors) {
    return (
      <TopContributorsSkeleton />
    )
  }

  if (!contributors || contributors.length === 0) {
    return null
  }

  return (
    <section className='RepositoryDetails__contributors'>
      <h4>Top Contributors</h4>
      <div className='RepositoryDetails__contributors-grid'>
        {contributors.map(contributor => (
          <div key={contributor.id} className='RepositoryDetails__contributors-item'>
            <Link
              to={contributor.htmlUrl}
              target='_blank'
              className='RepositoryDetails__contributors-avatar'
            >
              <Avatar
                img={contributor.avatarUrl}
                name={contributor.login}
                size='medium'
              />
            </Link>
            <div className='RepositoryDetails__contributors-info'>
              <Text><strong>{contributor.login}</strong></Text>
              <Text size='small'>
                {contributor.contributions} contributions
              </Text>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TopContributors