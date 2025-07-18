import { use } from 'react'
import { useAppSelector } from '../../../hooks/store.ts'
import useGoBack from '../../../hooks/common/router/useGoBack.ts'

import { selectRepository } from '../../../stores/slices/repositories.ts'

// @ts-ignore
import ArrowLeft from '../../../assets/svg/ic-arrow-left.svg?react'
import { Link } from 'react-router-dom'
import LanguageDot from '../../common/repositories/LanguageDot.tsx'
import Avatar from '../../../@styleguide/components/Avatar/Avatar.tsx'
import Button from '../../../@styleguide/components/Button/Button.tsx'
import Text from '../../../@styleguide/components/Text/Text.tsx'

import './RepositoryDetails.css'

const RepositoryDetails = ({ loadingData }: { loadingData: Promise<number> }) => {
  const id = use(loadingData)

  const goBack = useGoBack()

  const repository = useAppSelector(state => selectRepository(state, id))

  return (
    <div className='RepositoryDetails'>
        <header className='RepositoryDetails__header'>
          <div className='RepositoryDetails__header-main-info'>
            <Button
              theme='ghost'
              size='lg'
              className='RepositoryDetails__back'
              onClick={() => goBack({ fallback: '/' })}
            >
              <ArrowLeft />
            </Button>

            <div className='RepositoryDetails__heading'>
              <h1>
                <Avatar
                  img={repository.owner?.avatarUrl}
                  name={repository.owner?.name || 'owner avatar'}
                  size='large'
                />
                <Link className='Anchor' to={repository.htmlUrl} target='_blank' rel='noopener noreferrer'>
                  {repository.fullName}
                </Link>
              </h1>

              <div className='Badge RepositoryDetails__visibility-badge'>
                {repository.private ? 'Private' : 'Public'}
              </div>
            </div>
          </div>

          {repository.description && (
            <p className='RepositoryDetails__description'>{repository.description}</p>
          )}

          {repository.topics && repository.topics.length > 0 && (
            <div className='RepositoryDetails__topics'>
              {repository.topics.map(topic => (
                <span key={topic} className='Badge RepositoryDetails__topic-badge'>{topic}</span>
              ))}
            </div>
          )}
        </header>

        <section className='RepositoryDetails__stats'>
          <div className='RepositoryDetails__stats-card'>
            <span className='RepositoryDetails__stats-icon'>⭐</span>
            <div>
              <div className='RepositoryDetails__stats-value'>{repository.stargazersCount.toLocaleString()}</div>
              <div className='RepositoryDetails__stats-label'>Stars</div>
            </div>
          </div>

          <Link to={`${repository.htmlUrl}/forks`} target='_blank'>
            <div className='RepositoryDetails__stats-card'>
              <span className='RepositoryDetails__stats-icon'>🍴</span>
              <div>
                <div className='RepositoryDetails__stats-value'>{repository.forksCount?.toLocaleString() || '0'}</div>
                <div className='RepositoryDetails__stats-label'>Forks</div>
              </div>
            </div>
          </Link>

          <Link to={`${repository.htmlUrl}/watchers`} target='_blank'>
            <div className='RepositoryDetails__stats-card'>
              <span className='RepositoryDetails__stats-icon'>👁</span>
              <div>
                <div className='RepositoryDetails__stats-value'>{repository.watchersCount?.toLocaleString() || '0'}</div>
                <div className='RepositoryDetails__stats-label'>Watchers</div>
              </div>
            </div>
          </Link>

          <Link to={`${repository.htmlUrl}/issues`} target='_blank'>
            <div className='RepositoryDetails__stats-card'>
              <span className='RepositoryDetails__stats-icon'>🐛</span>
              <div>
                <div className='RepositoryDetails__stats-value'>{repository.openIssuesCount?.toLocaleString() || '0'}</div>
                <div className='RepositoryDetails__stats-label'>Open Issues</div>
              </div>
            </div>
          </Link>
        </section>

        <section className='RepositoryDetails__info'>
          <div className='RepositoryDetails__info-grid'>
            {repository.language && (
              <div className='RepositoryDetails__info-item'>
                <span className='RepositoryDetails__info-label'>Language:</span>
                <span className='RepositoryDetails__info-value'><LanguageDot language={repository.language} /> {repository.language}</span>
              </div>
            )}

            {repository.license && (
              <div className='RepositoryDetails__info-item'>
                <span className='RepositoryDetails__info-label'>License:</span>
                <span className='RepositoryDetails__info-value'>{repository.license?.name || '–'}</span>
              </div>
            )}

            {repository.defaultBranch && (
              <div className='RepositoryDetails__info-item'>
                <span className='RepositoryDetails__info-label'>Default Branch:</span>
                <span className='RepositoryDetails__info-value'>{repository.defaultBranch}</span>
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

      {repository.contributors && repository.contributors.length > 0 && (
        <section className='RepositoryDetails__contributors'>
          <h4>Top Contributors</h4>
          <div className='RepositoryDetails__contributors-grid'>
            {repository.contributors.map(contributor => (
              <div>
                <Link
                  key={contributor.id}
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
      )}
    </div>
  )
}

export default RepositoryDetails
