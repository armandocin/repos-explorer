import { RouterProvider } from 'react-router-dom'
import router from './router.tsx'
import {Provider} from 'react-redux'
import {store} from './stores/store.ts'

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
