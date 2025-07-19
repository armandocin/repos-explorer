// @ts-ignore
import ReposLogo from '../../../assets/svg/repos-explorer-logo-v2.svg?react'
import './Logo.css'

interface LogoProps {
  className?: string
  size?: number
  color?: string
}

const Logo = ({ className = '', size = 48, color = 'currentColor' }: LogoProps) => {
  return (
    <ReposLogo size={size} color={color} className={className} />
  )
}

export default Logo
