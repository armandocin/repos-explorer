import { type JSX } from 'react'
import type {Repository} from '../../../types/repositories/repository.ts'

import RepositoryCard from './RepositoryCard.tsx'

import './RepositoriesList.css'

export interface RepositoriesListProps {
  list: Repository[]
}

/**
 * A functional component that renders a list of repositories.
 * It displays individual repository details using the `RepositoryCard` component.
 *
 * @param {RepositoriesListProps} props - The properties passed to the component.
 * @param {Array} props.list - An array of repository objects to render.
 * @returns {JSX.Element} A JSX element representing the rendered repositories list.
 */
const RepositoriesList = ({ list }: RepositoriesListProps): JSX.Element => {
  return (
    <div className='RepositoriesList'>
      {list.map((repo) => (
        <RepositoryCard
          key={repo.id}
          repository={repo}
        />
      ))}
    </div>
  )
}

export default RepositoriesList
