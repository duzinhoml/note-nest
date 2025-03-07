import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx'

// FOR TESTING ONLY
import Home from './pages/Home.jsx';
import Settings from './pages/Settings.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        errorElement: <div className='text-light'>Uh-oh! Try Again!</div>,
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
