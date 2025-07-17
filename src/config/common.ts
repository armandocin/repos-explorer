import type {Config} from '../types/config.ts'

/**
 * This file should include the variables that share the format between all environments
 */
const common: Config = {
  pageSize: 30,
  api: {
    github: {
      baseUrl: import.meta.env.VITE_GITHUB_API_BASE_URL
    }
  }
}

export default common
