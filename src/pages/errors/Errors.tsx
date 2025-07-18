import {isRouteErrorResponse, useRouteError} from 'react-router-dom'
import NotFound from '../../components/common/errors/NotFound.tsx'
import GenericError from '../../components/common/errors/GenericError.tsx'

const Error = () => {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    // handle rputes errors
    switch (error.status) {
      case 404:
        return <NotFound />
      default:
        break
    }
  }

  return (
    <GenericError />
  )
}

export default Error
