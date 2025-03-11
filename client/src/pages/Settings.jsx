import { useState, useEffect, useLayoutEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries.js';

import Dashboard from '../settingsComponents/Dashboard/index.jsx';
import Error from './Error.jsx';

import Auth from '../utils/auth.js';

function Settings() {
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
                <Error 
                    messageTitle={"Hold on! You need to log in first."} 
                    messageDirection={"Please log in to access this page."}
                />
            ) : (
                <>
                    <Dashboard
                        user={user}
                        notes={user.notes}
                        tags={user.tags}
                        heading={`Settings`}
                        initials={user.initials}
                    />
                </>
            )}
        </>
    );
};

export default Settings;