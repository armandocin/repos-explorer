import type { JSX } from 'react'
import type { Repository } from '../../../types/repositories/repository.ts'

// @ts-ignore
import OpenNewIcon from '../../../assets/svg/ic-open-new.svg?react'

import './RepositoryCard.css'

interface RepoCardProps {
  repository: Repository
}

/**
 * RepositoryCard is a functional component that renders a styled card
 * displaying basic details about a GitHub repository. It accepts a repository
 * object as a prop and displays various attributes such as name, owner,
 * description, language, star count, and privacy status.
 *
 * @param {object} props - Properties passed to the component.
 * @param {Repository} props.repository - The repository object containing details about the GitHub repository.
 *
 * @returns {JSX.Element} A JSX element representing the repository card.
 */
const RepositoryCard = ({ repository }: RepoCardProps): JSX.Element => {
  const { owner, fullName, description, language, stargazersCount, htmlUrl, private: isPrivate } = repository

  return (
    <article className='RepoCard'>
      <div className='RepoCard__header'>
        <img
          className='RepoCard__avatar'
          src={owner.avatarUrl}
          alt={`${owner.login} avatar`}
          loading='lazy'
        />
        <div className='RepoCard__header-info'>
          <h3 className='RepoCard__title'>
            {fullName}
            <a
              className='RepoCard__title-link'
              href={htmlUrl}
              target='_blank'
              rel='noopener noreferrer'
            >
              <span title='Open in GitHub'>
                <OpenNewIcon />
              </span>
            </a>
          </h3>
          <p className='RepoCard__owner'>
            by <a
            href={owner.htmlUrl}
            target='_blank'
            rel='noopener noreferrer'
          >
            {owner.login}
          </a>
          </p>
        </div>
      </div>

      <p className='RepoCard__description'>
        {description || 'No description available'}
      </p>

      <div className='RepoCard__footer'>
        <div className='RepoCard__meta'>
          {language && (
            <span className='RepoCard__language'>
              <span className='RepoCard__language-dot' data-language={language}></span>
              {language}
            </span>
          )}
          <span className='RepoCard__stars'>
            ⭐ {stargazersCount.toLocaleString()}
          </span>
          {isPrivate && (
            <span className='RepoCard__private'>Private</span>
          )}
        </div>
      </div>
    </article>
  )
}

export default RepositoryCard
