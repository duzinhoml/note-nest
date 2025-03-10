import Sidebar from '../Sidebar/index.jsx';
import Header from '../Header/index.jsx';
import Notes from '../Options/index.jsx';
import Decision from '../Decision/index.jsx';

import './index.css';

function Dashboard({ user, notes, tags, heading, initials }) {

    return (
        <div className="settings-container">
            <Sidebar notes={notes} tags={tags}/>
            <Header heading={heading} initials={initials}/>
            <Notes notes={notes}/>
            <Decision user={user} notes={notes}/>
        </div>
    );
};

export default Dashboard;