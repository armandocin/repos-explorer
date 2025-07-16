import React, {type JSX} from 'react'

import './Input.css'

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange?: (value: string) => void
}

const Input = ({
  value,
  onChange,
  ...rest
}: InputProps): JSX.Element => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!e) return
    const { target: { value } } = e
    onChange && onChange(value)
  }

  return (
    <div className='Input'>
      <input
        className={'Input__element'}
        value={value}
        onChange={handleChange}
        {...rest}
      />
    </div>
  )
}

export default Input