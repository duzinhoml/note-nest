import { useState, useEffect, useLayoutEffect } from 'react';
import { useQuery } from '@apollo/client';

import Login from '../components/LoginRegister/Login/index.jsx';
import Register from '../components/LoginRegister/Register/index.jsx';
import Dashboard from '../components/Dashboard/index.jsx';

import { QUERY_ME } from '../utils/queries.js';

import Auth from '../utils/auth.js';
// import AddNote from '../components/CRUD/AddNote/index.jsx';

function Home() {
    const [accountStep, setAccountStep] = useState('login');
    const { loading, error, data} = useQuery(QUERY_ME);
    const [loginCheck, setLoginCheck] = useState(false);

    const checkLogin = () => {
        if (Auth.loggedIn()) {
            setLoginCheck(true);
        }
    };

    useLayoutEffect(() => {
        checkLogin();
    }, []);

    useEffect(() => {
        if (loginCheck) {
            if (error) {
                console.error('GraphQL Error:', error.message);
            }
        }
    }, [loginCheck, error])

    const user = data?.me || { notes: [] };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='ml-background'>
            <div className="flex-row justify-center mb-3">
                {!loginCheck ? (
                        accountStep === 'login' ? (
                            <Login setAccountStep={setAccountStep}/>
                        ) : (
                            <Register setAccountStep={setAccountStep}/>
                        )
                ) : (
                    !user.notes.length ? (
                        <Dashboard
                            notes={[]}
                            heading={`${user.fullName}, start nesting your thoughts today!`}
                        />
                    ) : (
                        <Dashboard
                            folders={user.folders}
                            notes={user.notes}
                            heading={`${user.fullName}'s Notes`}
                        />
                    )
                )}
            </div>
        </div>
    );
};

export default Home;