import reactLogo from '../../../assets/svg/react.svg'
import ThemeToggle from './ThemeToggle.tsx'

import './Header.css'

const Header = () => {
  return (
    <header className='Header'>
      <div className='Container Header__container'>
        <div className='Header__brand'>
          <a href='https://react.dev' target='_blank' rel='noopener noreferrer'>
            <img src={reactLogo} className='Header__logo' alt='React logo' />
          </a>
          <div>
            <h1 className='Header__title'>GitHub Explorer</h1>
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
