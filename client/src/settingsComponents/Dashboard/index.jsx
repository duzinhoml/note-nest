import Sidebar from '../Sidebar/index.jsx';
import Header from '../Header/index.jsx';
import Notes from '../Options/index.jsx';
import Decision from '../Decision/index.jsx';

import './index.css';

function Dashboard({ notes, tags, heading }) {

    return (
        <div className="settings-container">
            <Sidebar notes={notes} tags={tags}/>
            <Header heading={heading}/>
            <Notes notes={notes}/>
            <Decision notes={notes}/>
        </div>
    );
};

export default Dashboard;