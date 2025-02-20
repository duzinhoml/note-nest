import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

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

    return (
        <div>
            {location.pathname !== '/' && (
                <div className='nav-title'>
                    <Link to='/'>Home Page</Link>
                </div>
            )}

                {!loginCheck ? '' : (
                    // <button 
                    //     type="button" 
                    //     className="btn btn-light my-3 ms-3 border-2" 
                    //     onClick={() => Auth.logout()}
                    //     style={{ borderColor: '#ba0837'}}
                    // >
                    //     Logout
                    // </button>
                    <nav class="navbar navbar-expand-lg bg-body-tertiary">
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
                                    <li class="nav-item">
                                        <button 
                                            type="button"
                                            className="btn btn-light border-2 ms-2"
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