import { RouterProvider } from 'react-router-dom'
import router from './router/router.tsx'
import {Provider} from 'react-redux'
import {store} from './stores/store.ts'
import {ThemeProvider} from './contexts/ThemeProvider.tsx'

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  )
}

export default App
