import { type GitHubError, HttpError } from '../types/api/common.ts'

export const handleHttpError = (status: number, errorData?: GitHubError): never => {
  switch (status) {
    case 422:
      // Validation error - get specific message if available
      const validationMessage = errorData?.errors?.[0]?.message || errorData?.message || 'Invalid search query'
      throw new HttpError(status, validationMessage, errorData)

    case 503:
      throw new HttpError(status, 'GitHub service is temporarily unavailable. Please try again later.', errorData)

    case 304:
      // Not modified - not really an error, but handle it
      throw new HttpError(status, 'No new data available', errorData)

    default:
      throw new HttpError(status, errorData?.message || `Request failed with status ${status}`, errorData)
  }
}

export const getErrorMessage = (error: unknown): string => {
  if (error && typeof error === 'object' && 'name' in error && error.name === 'HttpError') {
    return (error as HttpError).message
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'An unexpected error occurred'
}
