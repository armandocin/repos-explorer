import React, {type JSX} from 'react'

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
        value={value}
        onChange={handleChange}
        {...rest}
      />
    </div>
  )
}

export default Input