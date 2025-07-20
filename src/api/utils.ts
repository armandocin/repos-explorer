import config from '../config'
import type {ApiWrapperOptions, GitHubError, RequestHeaders} from '../types/api/common.ts'
import {handleHttpError} from '../utils/errors.ts'

const CONTENT_TYPE = 'application/json'

/**
 * A wrapper for making API requests. It constructs a request based on the provided method, endpoint, and options such as payload, headers, and query parameters.
 *
 * @param {string} method The HTTP method to use for the request (e.g., 'GET', 'POST', 'DELETE', etc.). Defaults to an empty string.
 * @param {string} endpoint The API endpoint to send the request to.
 * @param {Object} options The options for configuring the request.
 * @param {string} options.path An optional path to append to the endpoint.
 * @param {Object} options.payload The payload or body to send with the request, typically used for POST, PUT, or DELETE methods.
 * @param {Object} options.extraHeaders Additional headers to include in the request.
 * @param {Object} options.params Query parameters to append to the request URL.
 * @param {string} options.overrideBaseUrl An optional base URL to override the default configured base URL.
 * @return {Promise<Response>} A promise resolving to the response of the fetch request.
 */
export async function apiWrapper (
  method: string = '',
  endpoint: string,
  { path, payload, extraHeaders, params, overrideBaseUrl }: ApiWrapperOptions
): Promise<Response> {
  let headers: RequestHeaders = {
    ...extraHeaders,
    'Accept': 'application/vnd.github.v3+json'
  }
  let action = method.toLowerCase()
  let isContentTypeSet = extraHeaders && extraHeaders['Content-Type']

  if (!isContentTypeSet && payload && (action === 'post' || action === 'delete' || action === 'put')) {
    headers['Content-Type'] = CONTENT_TYPE
  }

  let baseUrl = overrideBaseUrl || config.api.github.baseUrl
  let url = endpoint
  if (path) {
    url += `/${path}`
  }

  let urlObj = new URL(url, baseUrl)
  let search = new URLSearchParams(params)
  urlObj.search = search.toString()

  try {
    const response = await fetch(
      urlObj.href,
      {
        method,
        body: payload ? JSON.stringify(payload) : undefined,
        headers
      }
    )

    if (!response.ok) {
      let errorData: GitHubError | undefined

      try {
        errorData = await response.json()
      } catch {
        // If JSON parsing fails, continue without error details
      }

      // This will throw an HttpError
      handleHttpError(response.status, errorData)
    }

    return response
  } catch (error) {
    if (error instanceof Error && error.name === 'HttpError') {
      throw error
    }

    // For network errors or other issues
    throw new Error('Network error. Please check your connection.')
  }
}
