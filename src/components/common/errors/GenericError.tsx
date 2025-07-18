import React from 'react'
import Button from '../../../@styleguide/components/Button/Button.tsx'

const Error: React.FC = () => {
  return (
    <div style={{textAlign: 'center', padding: '2rem'}}>
      <h1>An error occurred</h1>
      <h3>Oops! Something went wrong</h3>
      <a href='/'>
        <Button theme='primary'>
          Go back to the homepage
        </Button>
      </a>
    </div>
  )
}

export default Error
