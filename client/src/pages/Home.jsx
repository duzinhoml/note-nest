import { useState, useEffect, useLayoutEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries.js';

import Login from '../components/LoginRegister/Login/index.jsx';
import Register from '../components/LoginRegister/Register/index.jsx';

import Dashboard from '../components/Dashboard/index.jsx';

import Auth from '../utils/auth.js';

function Home() {
    const [accountStep, setAccountStep] = useState('login');
    const { loading, error, data } = useQuery(QUERY_ME);
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
    }, [loginCheck, error]);

    const user = data?.me || { notes: [] };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {!loginCheck ? (
                    accountStep === 'login' ? (
                        <Login setAccountStep={setAccountStep}/>
                    ) : (
                        <Register setAccountStep={setAccountStep}/>
                    )
            ) : (
                !user.notes.length ? (
                    <Dashboard
                        user={user}
                        notes={[]}
                        heading={`${user.firstName}, start nesting your thoughts today!`}
                        initials={user.initials}
                    />
                ) : (
                    <Dashboard
                        user={user}
                        notes={user.notes}
                        tags={user.tags}
                        heading={`${user.firstName}'s Notes`}
                        initials={user.initials}
                    />
                )
            )}
        </>
    );
};

export default Home;