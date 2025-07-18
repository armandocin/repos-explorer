import { use } from 'react'
import { useAppSelector } from '../../../hooks/store.ts'
import useGoBack from '../../../hooks/common/router/useGoBack.ts'

import { selectRepository } from '../../../stores/slices/repositories.ts'

import { Link } from 'react-router-dom'
import Button from '../../../@styleguide/components/Button/Button.tsx'

import './RepositoryDetails.css'

const RepositoryDetails = ({ loadingData }: { loadingData: Promise<number> }) => {
  const id = use(loadingData)

  const goBack = useGoBack()

  const repository = useAppSelector(state => selectRepository(state, id))

  return (
    <div className='RepositoryDetails'>
        <Button
          className='RepositoryDetails__back'
          onClick={() => goBack({ fallback: '/' })}
        >
          ← Back to search
        </Button>

        <header className='RepositoryDetails__header'>
          <h1>
            <img
              src={repository.owner?.avatarUrl}
              alt={repository.owner?.name}
              className='RepositoryDetails__owner-avatar'
            />
            <Link to={repository.owner?.htmlUrl} target='_blank' rel='noopener noreferrer'>
              {repository.owner?.name}
            </Link>
            {' / '}
            <Link to={repository.htmlUrl} target='_blank' rel='noopener noreferrer'>
              {repository.name}
            </Link>
          </h1>

          {repository.description && (
            <p className='RepositoryDetails__description'>{repository.description}</p>
          )}

        </header>

        <section className='RepositoryDetails__stats'>
          <div className='stat-card'>
            <span className='stat-icon'>⭐</span>
            <div>
              <div className='stat-value'>{repository.stargazersCount.toLocaleString()}</div>
              <div className='stat-label'>Stars</div>
            </div>
          </div>

          <div className='stat-card'>
            <span className='stat-icon'>🍴</span>
            <div>
              <div className='stat-value'>{repository.forksCount?.toLocaleString() || '0'}</div>
              <div className='stat-label'>Forks</div>
            </div>
          </div>

          <div className='stat-card'>
            <span className='stat-icon'>👁</span>
            <div>
              <div className='stat-value'>{repository.watchersCount?.toLocaleString() || '0'}</div>
              <div className='stat-label'>Watchers</div>
            </div>
          </div>

          <div className='stat-card'>
            <span className='stat-icon'>🐛</span>
            <div>
              <div className='stat-value'>{repository.openIssuesCount?.toLocaleString() || '0'}</div>
              <div className='stat-label'>Open Issues</div>
            </div>
          </div>
        </section>

        <section className='RepositoryDetails__info'>
          <div className='info-grid'>
            {repository.language && (
              <div className='info-item'>
                <span className='info-label'>Language:</span>
                <span className='info-value'>{repository.language}</span>
              </div>
            )}

            {repository.license && (
              <div className='info-item'>
                <span className='info-label'>License:</span>
                <span className='info-value'>{repository.license}</span>
              </div>
            )}

            {repository.defaultBranch && (
              <div className='info-item'>
                <span className='info-label'>Default Branch:</span>
                <span className='info-value'>{repository.defaultBranch}</span>
              </div>
            )}

            {repository.createdAt && (
              <div className='info-item'>
                <span className='info-label'>Created:</span>
                <span className='info-value'>
                {new Date(repository.createdAt).toLocaleDateString()}
              </span>
              </div>
            )}
          </div>
        </section>
    </div>
  )
}

export default RepositoryDetails
