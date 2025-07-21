import Logo from '../../../@styleguide/components/Logo/Logo.tsx'
import ThemeToggle from './ThemeToggle.tsx'

import './Header.css'

const Header = () => {
  return (
    <header className='Header'>
      <div className='Container Header__container'>
        <div className='Header__brand'>
          <Logo className='Logo--animated Header__logo' />
          <div>
            <h1 className='Header__title'>Repos Explorer</h1>
            <p className='Header__subtitle'>Discover amazing repositories</p>
          </div>
        </div>

        <div className='Header__actions'>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

export default Header
