import { useState, useEffect, useLayoutEffect } from 'react';
import { useQuery } from '@apollo/client';

// import Login from '../components/LoginRegister/Login/index.jsx';
// import Register from '../components/LoginRegister/Register/index.jsx';

import { QUERY_ME } from '../utils/queries.js';

import Auth from '../utils/auth.js';

// import Sidebar from '../testComponents/Sidebar/index.jsx';
// import Header from '../testComponents/Header/index.jsx';
// import Notes from '../testComponents/Notes/index.jsx';
// import SingleNote from '../testComponents/SingleNote/index.jsx';
// import NoteActions from '../testComponents/NoteActions/index.jsx';
import Dashboard from '../testComponents/Dashboard/index.jsx';

function TestHome() {
    // const [accountStep, setAccountStep] = useState('login');
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
    }, [loginCheck, error])

    const user = data?.me || { notes: [] };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        // <div className='d-flex'>
        //     <Sidebar />
        //     <div 
        //         className="vertical-line" 
        //         style={{
        //             width: '1px',
        //             backgroundColor: 'rgb(91, 91, 91)',
        //             height: '100vh',
        //             margin: '0 2px'
        //         }} 
        //     />
        //     <div className="d-flex flex-column flex-grow-1">
        //         <Header />
        //         <div className="d-flex flex-grow-1">
        //             <Notes/>
        //             <div
        //                 className="vertical-line"
        //                 style={{
        //                     width: '1px',
        //                     backgroundColor: 'rgb(91, 91, 91)',
        //                     height: '100%',
        //                     margin: '0 2px'
        //                 }}
        //             />
        //             <SingleNote/>
        //             <NoteActions/>
        //         </div>
        //     </div>
        // </div>
        <>
            {!user.notes.length ? (
                <Dashboard/>
            ) : (
                <Dashboard
                    folders={user.folders}
                    notes={user.notes}
                    heading={`${user.fullName}'s Notes`}
                />
            )}
        </>
    );
};

export default TestHome;