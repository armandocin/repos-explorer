export type RequestParams = Record<string, string>
export type RequestHeaders = Record<string, string>

export interface ApiWrapperOptions {
  path?: string
  payload?: any
  extraHeaders?: RequestHeaders
  params?: RequestParams
  overrideBaseUrl?: string
}

export interface GitHubError {
  message: string
  errors?: Array<{
    message: string
    resource: string
    field: string
    code: string
  }>
  documentation_url?: string
  status?: string
}

export class HttpError extends Error {
  status: number
  details?: GitHubError

  constructor(status: number, message: string, details?: GitHubError) {
    super(message)
    this.name = 'HttpError'
    this.status = status
    this.details = details
  }
}
