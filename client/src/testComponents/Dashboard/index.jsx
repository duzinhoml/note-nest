// import { useNoteList } from "../../context/NoteListContext.jsx";

import Sidebar from "../Sidebar/index.jsx";
import Header from "../Header/index.jsx";
import Notes from "../Notes/index.jsx";
import SingleNote from "../SingleNote/index.jsx";
import NoteActions from "../NoteActions/index.jsx";
import './index.css';

function Dashboard({ notes, heading }) {

    return (
        <div className="dashboard-container">
            <Sidebar notes={notes}/>
            {/* <div className="p-0" style={{ width: '0.1px', height: '100%', backgroundColor: 'hsl(0, 0.00%, 21%)' }}></div> */}
            <Header heading={heading}/>
            <Notes notes={notes}/>
            <SingleNote/>
            <NoteActions/>
        </div>
    );
};

export default Dashboard;