import { Button } from '../../../@styleguide'
import useGoBack from '../../../hooks/common/router/useGoBack.ts'

const PageError = ({ name }: { name: string }) => {
  const goBack = useGoBack()
  return (
    <div style={{textAlign: 'center', padding: '2rem'}}>
      <h1>An error occurred 😵</h1>
      <h3>Oops! Something went wrong while loading the {name} page</h3>
      <Button theme='primary' onClick={() => goBack({ fallback: '/' })}>
        Go Back
      </Button>
    </div>
  )
}

export default PageError
