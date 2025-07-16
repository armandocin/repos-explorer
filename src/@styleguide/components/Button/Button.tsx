import React, { type ButtonHTMLAttributes } from 'react'
import './Button.css'

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  type?: 'button' | 'submit' | 'reset' | 'action'
  label?: string
  theme?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children?: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const Button = ({
   type = 'button',
   label,
   theme = 'primary',
   size = 'md',
   children,
   className = '',
   onClick,
   ...rest
 }: ButtonProps) => {
  const buttonType = type === 'action' ? 'button' : type

  const classNames = [
    'Button',
    `Button--${theme}`,
    `Button--${size}`,
    className
  ].filter(Boolean).join(' ')

  return (
    <button
      type={buttonType}
      className={classNames}
      onClick={onClick}
      {...rest}
    >
      {children || label}
    </button>
  )
}

export default Button
