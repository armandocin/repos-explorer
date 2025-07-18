import reactLogo from '../../../assets/svg/react.svg'
import ThemeToggle from './ThemeToggle.tsx'

const Layout = () => {
  return (
    <header>
      <div className='Container'>
        <div>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>

        <div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

export default Layout
