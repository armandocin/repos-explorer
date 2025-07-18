import React from 'react'
import { Button } from '../../../@styleguide'
import { Link } from 'react-router-dom'

const Error: React.FC = () => {
  return (
    <div style={{textAlign: 'center', padding: '2rem'}}>
      <h1>An error occurred</h1>
      <h3>Oops! Something went wrong</h3>
      <Link to='/'>
        <Button theme='primary'>
          Go to the homepage
        </Button>
      </Link>
    </div>
  )
}

export default Error
