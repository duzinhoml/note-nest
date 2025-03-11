import { useNavigate, useLocation } from 'react-router-dom';

import '../components/Dashboard/index.css';

function Error({ messageTitle, messageDirection }) {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <>
            <nav className="container">
                <div 
                    className="container-fluid d-flex justify-content-between mt-3 pb-3" 
                    style={{ borderBottom: '2px solid hsl(235, 13%, 57%)' }}
                >
                    <h3 className="text-light m-0">NoteNest</h3>
                    <button 
                        className="btn error-page-btn text-light" 
                        onClick={() => navigate('/')}
                    >
                        {location.pathname === '/settings' ? 'Login' : 'Home'}
                    </button>
                </div>
            </nav>
            <div className="container mt-5">
                <p className="text-light text-center text-sm-start" style={{ fontSize: '2rem' }}>
                    {location.pathname === '/settings' ? messageTitle : `Oops! Looks like you're lost.`} <br />
                    {location.pathname === '/settings' ? messageDirection : `The page you're looking for doesn't exist. Try heading back to the homepage.`}
                </p>
            </div>
        </>
    );
}

export default Error;