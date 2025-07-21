import {
    createBrowserRouter,
} from 'react-router-dom'

import { repositoryDetailsLoader } from './loaders'

import Layout from '../components/common/layouts/Layout.tsx'
import Errors from '../pages/errors/Errors.tsx'
import Search from '../pages/repositories/Search.tsx'
import Repository from '../pages/repositories/Repository.tsx'
import PageLoad from '../components/common/errors/PageLoad.tsx'

/**
 * is the function to create the routing rules. The Layout is used as generic layout with header and footer for every pages passed as children.
 * Children are rendered in the <Outlet> component.
 */
const createRouter = createBrowserRouter([
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
                loader: repositoryDetailsLoader,
                element: <Repository />,
                errorElement: (
                  <PageLoad name={'repository'} />
                )
            }
        ]
    }
], { basename: import.meta.env.BASE_URL })

export default createRouter
