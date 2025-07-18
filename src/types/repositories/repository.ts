import type { Contributor, User } from '../users/user.ts'

/**
 * Represents a repository with its associated data and metadata.
 *
 * @interface Repository
 * @property {number} id - Unique identifier for the repository.
 * @property {string} name - Name of the repository.
 * @property {string} fullName - Full name of the repository, including the owner's name.
 * @property {string} description - Description of the repository.
 * @property {boolean} private - Indicates if the repository is private or public.
 * @property {string} htmlUrl - URL to the repository's web page.
 * @property {string} language - Main language of the repository's codebase.
 * @property {User} owner - User details of the repository owner.
 * @property {number} stargazersCount - Number of stars the repository has received.
 */
export interface Repository {
  id: number
  name: string
  fullName: string
  description: string
  private: boolean
  htmlUrl: string
  language: string
  owner: User
  stargazersCount: number,

  openIssuesCount?: number
  forksCount?: number
  watchersCount?: number
  contributors?: Contributor[]
  topics?: string[]
  license?: Record<string, string>
  defaultBranch?: string
  createdAt?: string
  updatedAt?: string
}
