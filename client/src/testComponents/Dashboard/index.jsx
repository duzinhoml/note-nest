
import Sidebar from "../Sidebar/index.jsx";
import Header from "../Header/index.jsx";
import Notes from "../Notes/index.jsx";
import SingleNote from "../SingleNote/index.jsx";
import NoteActions from "../NoteActions/index.jsx";
import './index.css';

function Dashboard({ notes, tags, heading }) {

    return (
        <div className="dashboard-container">
            <Sidebar notes={notes} tags={tags}/>
            <Header heading={heading}/>
            <Notes notes={notes}/>
            <SingleNote/>
            <NoteActions/>
        </div>
    );
};

export default Dashboard;