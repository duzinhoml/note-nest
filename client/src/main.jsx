import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx'
// import Home from './pages/Home.jsx';

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
                element: <TestHome/>
            },
            {
                path: '/note/:noteId',
                element: <TestHome/>
            },
            {
                path: '/tag/:tagName',
                element: <TestHome/>
            },
            {
                path: '/note/:noteId/tag/:tagName',
                element: <TestHome/>
            },
        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}/>
);
