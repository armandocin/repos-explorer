import common from './common'
import development from './development'
import production from './production'
import merge from 'lodash.merge'
import type { Config, Environment } from '../types/config.ts'

const defaultEnvironment = 'development'

const config: Record<Environment, Config> = {
  development,
  production
} as const

const env = import.meta.env.MODE as Environment || defaultEnvironment

const envConfig = config[env] || config.development
const finalConfig: Config = { ...merge(common, envConfig), env }

export default finalConfig
