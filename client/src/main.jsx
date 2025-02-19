// import './index.css'

import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx'
import Home from './pages/Home.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        errorElement: <div>Uh-oh! Try Again!</div>,
        children: [
            {
                index: true,
                element: <Home/>
            },
            // {
            //     path: '/notes/:noteId',
            //     element: <SingleNote/>
            // }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}/>
);
