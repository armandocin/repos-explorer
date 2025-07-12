import {
    createBrowserRouter,
} from 'react-router-dom'
import Layout from '../components/layouts/Layout'

export default createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <div>Search</div>,
            },
            {
                path: '/repos/:id',
                element: <div>This is a repo</div>,
            }
        ]
    }
])
