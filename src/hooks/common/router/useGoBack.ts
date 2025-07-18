import { useLocation, useNavigate } from 'react-router-dom'

const useGoBack = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const thereIsAPrevPage = location.key !== "default"
  if (thereIsAPrevPage) {
    return (_arg: { fallback?: string }) => navigate(-1)
  } else {
    return ({ fallback }: { fallback?: string }) => navigate(fallback || "/")
  }
}

export default useGoBack
