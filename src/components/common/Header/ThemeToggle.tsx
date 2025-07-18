import { useTheme } from '../../../contexts/ThemeProvider.tsx'
import { Button } from '../../../@styleguide'

const Layout = () => {
  const { theme, toggleTheme } = useTheme()
  return (
    <Button
      onClick={toggleTheme}
      theme='ghost'
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </Button>
  )
}

export default Layout
