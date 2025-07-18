import type { JSX } from 'react'
import type { Repository } from '../../../types/repositories/repository.ts'

import { useNavigate } from 'react-router-dom'

// @ts-ignore
import OpenNewIcon from '../../../assets/svg/ic-open-new.svg?react'
import { Avatar, Text } from '../../../@styleguide'
import LanguageDot from '../../common/repositories/LanguageDot.tsx'

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
  const navigate = useNavigate()
  const { owner, fullName, name, description, language, stargazersCount, htmlUrl, private: isPrivate } = repository

  const handleOpenDetails = (): void => {
    navigate(`/repos/${owner.login}/${name}`)
  }

  return (
    <article className='RepoCard' onClick={handleOpenDetails}>
      <div className='RepoCard__header'>
        <Avatar
          size='medium'
          img={owner.avatarUrl}
          name={`${owner.login} avatar`}
        />
        <div className='RepoCard__header-info'>
          <h3 className='RepoCard__title'>
            {fullName}
          </h3>
          <Text className='RepoCard__owner' size='small'>
            by <a
            className='Anchor'
            href={owner.htmlUrl}
            target='_blank'
            rel='noopener noreferrer'
          >
            {owner.login}
          </a>
          </Text>
        </div>
        <a
          className='RepoCard__title-link Anchor'
          href={htmlUrl}
          target='_blank'
          rel='noopener noreferrer'
        >
          <span title='Open in GitHub'>
            <OpenNewIcon />
          </span>
        </a>
      </div>

      <Text className='RepoCard__description' size='small'>
        {description || 'No description available'}
      </Text>

      <div className='RepoCard__footer'>
        <div className='RepoCard__meta'>
          {language && (
            <span className='RepoCard__language'>
              <LanguageDot language={language} />
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
