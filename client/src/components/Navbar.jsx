import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useOffcanvas } from '../context/OffcanvasContext.jsx';
import { useNoteList } from '../context/NoteListContext.jsx';

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

    const { isOffcanvasOpen, toggleOffcanvas } = useOffcanvas();
    const [offcanvasWidth, setOffcanvasWidth] = useState(window.innerWidth < 768 ? 150 : 250);

    useEffect(() => {
        const handleResize = () => {
            setOffcanvasWidth(window.innerWidth < 768 ? 150 : 250);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const location = useLocation();

    const { setCurrentNote } = useNoteList();
    const navigate = useNavigate();

    const createNewNote = () => {
        setCurrentNote(null);
        navigate('/');
    }

    return (
        <div>

                {!loginCheck ? '' : (
                    <nav class="navbar navbar-expand-lg bg-body-tertiary" style={{ marginLeft: isOffcanvasOpen ? `${offcanvasWidth}px` : "0", transition: "margin-left 0.3s ease" }}>
                        <div class="container-fluid">
                            <span class="navbar-brand">NoteNest</span>

                            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>

                            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                                <ul class="navbar-nav">
                                    {location.pathname !== '/' ? (
                                        <li class="nav-item">
                                            <button 
                                                type="button"
                                                className={`btn btn-light border-2 ${offcanvasWidth === 150 ? '' : 'ms-2'}`}
                                                onClick={() => createNewNote()}
                                                style={{ borderColor: '#ba0837', cursor: 'pointer' }}
                                            >
                                                New Note
                                            </button>
                                        </li>
                                    ) : ''}
                                    <li className="nav-item">
                                        <button 
                                            type="button" data-bs-toggle="offcanvas" 
                                            class={`btn btn-light border-2 ${offcanvasWidth === 150 ? '' : 'ms-2'}`}
                                            data-bs-target="#offcanvasNotes" 
                                            aria-controls="offcanvasScrolling"
                                            onClick={() => toggleOffcanvas()}
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