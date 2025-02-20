import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useOffcanvas } from './Dashboard/OffcanvasContext.jsx';

import Auth from '../utils/auth.js';

function Navbar() {
    const [loginCheck, setLoginCheck] = useState(false);

    const checkLogin = () => {
        if (Auth.loggedIn()) {
            setLoginCheck(true);
        };
    };

    useEffect(() => {
        console.log(loginCheck);
        checkLogin();
    }, [loginCheck]);

    const location = useLocation();

    const { isOffcanvasOpen, toggleOffcanvas } = useOffcanvas();
    const [offcanvasWidth, setOffcanvasWidth] = useState(window.innerWidth < 768 ? 150 : 250);

    useEffect(() => {
        const handleResize = () => {
            setOffcanvasWidth(window.innerWidth < 768 ? 150 : 250);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div>
            {location.pathname !== '/' && (
                <div className='nav-title'>
                    <Link to='/'>Home Page</Link>
                </div>
            )}

                {!loginCheck ? '' : (
                    <nav class="navbar navbar-expand-lg bg-body-tertiary" style={{ marginLeft: isOffcanvasOpen ? `${offcanvasWidth}px` : "0", transition: "margin-left 0.3s ease" }}>
                        <div class="container-fluid">
                            <span class="navbar-brand">NoteNest</span>

                            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>

                            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                                <ul class="navbar-nav">
                                    <li class="nav-item">
                                        <button 
                                            type="button" 
                                            class="btn btn-light border-2" 
                                            data-bs-toggle="modal"
                                            data-bs-target="#addNoteModal"
                                            style={{ borderColor: '#ba0837' }}
                                        >
                                            Add Note
                                        </button>
                                    </li>
                                    <li className="nav-item">
                                        <button 
                                            type="button" data-bs-toggle="offcanvas" 
                                            class={`btn btn-light border-2 ${offcanvasWidth === 150 ? '' : 'ms-2'}`}
                                            data-bs-target="#offcanvasNotes" 
                                            aria-controls="offcanvasScrolling"
                                            onClick={toggleOffcanvas}
                                            style={{ borderColor: '#ba0837' }}
                                        >
                                            {isOffcanvasOpen ? 'Close Sidebar' : 'Open Sidebar'}
                                        </button>
                                    </li>
                                    <li class="nav-item">
                                        <button 
                                            type="button"
                                            className={`btn btn-light border-2 ${offcanvasWidth === 150 ? '' : 'ms-2'}`}
                                            onClick={() => Auth.logout()}
                                            style={{ borderColor: '#ba0837', cursor: 'pointer' }}
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                )}
        </div>
    );
};

export default Navbar;