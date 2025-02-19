import { useState, useEffect, useLayoutEffect } from 'react';
import { useQuery } from '@apollo/client';

import Register from '../components/LoginRegister/Register/index.jsx';
import TestNoteList from '../components/TestNoteList/index.jsx';

import { QUERY_ME } from '../utils/queries.js';

import Auth from '../utils/auth.js';

function Home() {
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

    const user = data?.me || {};

    if (loading) {
        return <div>Loading...</div>;
    }

    // if (!user?.username) {
    //     return (
    //         <h4>
    //             You need to be logged in to see this. Use the navigation links above to
    //             sign up or log in!
    //         </h4>
    //     );
    // }

    return (
        <div>
            <div className="flex-row justify-center mb-3">
                {!loginCheck ? (
                    <div>
                        <div>Login/Register to view notes</div>
                        <Register/>
                    </div>
                ) : (
                    <div>
                        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
                            Viewing your profile.
                        </h2>

                        <div className="col-12 col-md-10 mb-5">
                            <TestNoteList
                                notes={user.notes}
                                title={`${user.username}'s notes...`}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;