export type RequestParams = Record<string, string>
export type RequestHeaders = Record<string, string>

export interface ApiWrapperOptions {
  path?: string
  payload?: any
  extraHeaders?: RequestHeaders
  params?: RequestParams
  overrideBaseUrl?: string
}
