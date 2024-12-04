import { createBrowserRouter } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import Dashboard from './pages/Dashboard'
import Tasks from './pages/Tasks'
import NotFound from './pages/NotFound'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            {
                path: '',
                element: <Dashboard />
            },
            {
                path: '/tasks',
                element: <Tasks />
            },
            {
                path: 'task:id'
            }
        ]
    },
    {
        path: "*",
        element: <NotFound />,
    },
],
{
    future: {
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_relativeSplatPath: true,
        v7_skipActionErrorRevalidation: true,
    },
}
)