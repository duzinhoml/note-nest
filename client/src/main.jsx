// import './index.css'

import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx'
// import Home from './pages/Home.jsx';
// import LoginRegister from './pages/LoginRegister.jsx';
import TestHome from './pages/TestHome.jsx';
import TestLogin from './pages/TestLogin.jsx';
// import TestSignUp 
import TestProfile from './pages/TestProfile.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        errorElement: <div>Uh-oh! Try Again!</div>,
        children: [
            {
                index: true,
                element: <TestHome/>
            },
            {
                path: '/login',
                element: <TestLogin/>
            },
            // {
            //     path: '/signup',
            //     element: <LoginRegister/>
            // },
            {
                path: '/profiles/:username',
                element: <TestProfile/>
            },
            {
                path: '/me',
                element: <TestProfile/>
            }
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
