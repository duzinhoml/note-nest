import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx'

import Home from './pages/Home.jsx';
import Settings from './pages/Settings.jsx';
import Error from './pages/Error.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        errorElement: <Error/>,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: '/note/:noteId',
                element: <Home/>
            },
            {
                path: '/tag/:tagName',
                element: <Home/>
            },
            {
                path: '/note/:noteId/tag/:tagName',
                element: <Home/>
            },
            {
                path: '/settings',
                element: <Settings/>
            }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}/>
);
