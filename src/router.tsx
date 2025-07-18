import {
    createBrowserRouter,
} from 'react-router-dom'
import Layout from './components/common/layouts/Layout.tsx'
import Errors from './pages/errors/Errors.tsx'
import Search from './pages/repositories/Search.tsx'

/**
 * is the function to create the routing rules. The Layout is used as generic layout with header and footer for every pages passed as children.
 * Children are rendered in the <Outlet> component.
 */
export default createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <Errors />,
        children: [
            {
                index: true,
                element: <Search />,
            },
            {
                path: '/repos/:owner/:repo',
                element: <>This is a repo</>,
            }
        ]
    }
])
