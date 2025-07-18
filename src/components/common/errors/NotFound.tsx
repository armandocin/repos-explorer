import React from 'react'
import Button from '../../../@styleguide/components/Button/Button.tsx'

const NotFound: React.FC = () => {
  return (
    <div style={{textAlign: 'center', padding: '2rem'}}>
      <h1>404</h1>
      <h3>Oops! The page you’re looking for doesn’t exist.</h3>
      <a href="/">
        <Button theme='primary'>
          Go back to the homepage
        </Button>
      </a>
    </div>
  )
}

export default NotFound
