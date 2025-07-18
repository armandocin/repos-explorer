import React from 'react'

import './Avatar.css'

type AvatarSize = 'small' | 'medium' | 'large'
type DefaultIcon = 'single' | 'team'

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  img?: string
  name: string
  size?: AvatarSize
  defaultIcon?: DefaultIcon
  className?: string
  onClick?: () => void
}

const Avatar: React.FC<AvatarProps> = ({
  size = 'normal',
  img,
  name,
  onClick,
  className,
  ...rest
}) => {
  let classNames: any[] | string = []
  if (onClick) classNames.push('Avatar--pointer')

  classNames = [
    ...classNames,
    'Avatar Avatar__img',
    `Avatar--pointer`,
    `Avatar--${size}`,
    className
  ].filter(Boolean).join(' ')

  return (
    <img
      className={classNames}
      alt={`${name} avatar`}
      src={img || `https://ui-avatars.com/api/?name=${name}&background=random&color=fff&size=128`}
      onClick={onClick}
      {...rest}
    />
  )
}

export default Avatar