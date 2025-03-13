import { useState, useEffect } from 'react';

import Sidebar from "../Sidebar/index.jsx";
import Header from "../Header/index.jsx";
import Notes from "../Notes/index.jsx";
import SingleNote from "../SingleNote/index.jsx";
import NoteActions from "../NoteActions/index.jsx";

import SmallHeader from '../../smallComponents/Header/index.jsx';
import ActivePage from "../ActivePage/index.jsx";
import Footer from "../Footer/index.jsx";

import './index.css';

function Dashboard({ user, notes, tags, heading, initials }) {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1024)
        };
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="dashboard-container">
            <Sidebar notes={notes} tags={tags}/>
            {!isMobile && <Header heading={heading} initials={initials}/>}
            {!isMobile && <Notes notes={notes}/>}
            <SingleNote/>
            <NoteActions/>

            {isMobile && <SmallHeader/>}
            {isMobile && <ActivePage user={user} notes={notes} tags={tags}/>}
            <Footer/>
        </div>
    );
};

export default Dashboard;