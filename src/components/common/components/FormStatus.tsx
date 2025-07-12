import React from 'react'
import {useFormStatus} from 'react-dom'

const FormStatus: React.FC = () => {
  const { pending } = useFormStatus()

  if (!pending) return null

  return (
    <div>
      Searching...
    </div>
  )
}

export default FormStatus
