import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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

    return (
        <div>
            <div className='nav-title'>
                <Link to='/'>Home Page</Link>
            </div>
            <ul>
                {!loginCheck ? (
                    <li className='nav-item'>
                        <button type='button'>
                        <Link to='/login'>Login</Link>
                        </button>
                    </li>
                    ) : (
                    <li className='nav-item'>
                        <button type='button' onClick={() => {
                        Auth.logout();
                        }}>Logout</button>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default Navbar;