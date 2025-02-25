// import './index.css'

import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx'
import Home from './pages/Home.jsx';

// FOR TESTING ONLY
import TestHome from './pages/TestHome.jsx';

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
            // {
            //     path: '/notes/:noteId',
            //     element: <Home/>
            // },
            {
                path: '/testing',
                element: <TestHome/>
            },
            {
                path: '/notes/:noteId',
                element: <TestHome/>
            }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}/>
);
