// import { useNoteList } from "../../context/NoteListContext.jsx";

import Sidebar from "../Sidebar/index.jsx";
import Header from "../Header/index.jsx";
import Notes from "../Notes/index.jsx";
import SingleNote from "../SingleNote/index.jsx";
import NoteActions from "../NoteActions/index.jsx";

function Dashboard({ notes, heading }) {

    return (
        <div className="container-fluid">
            <div className="row vh-100">
                <Sidebar/>
                <div className="p-0" style={{ width: '0.1px', height: '100%', backgroundColor: 'hsl(0, 0.00%, 21%)' }}></div>
                <div className="col d-flex flex-column">
                    <Header heading={heading}/>
                    {/* <hr style={{ color: 'white' }}/> */}
                    <div className="row flex-grow-1 mt-2">
                        <Notes notes={notes}/>
                        <div className="p-0" style={{ width: '0.1px', height: '100%', backgroundColor: 'hsl(0, 0.00%, 21%)' }}></div>
                        <SingleNote/>
                        <div className="p-0" style={{ width: '0.2px', height: '100%', backgroundColor: 'hsl(0, 0.00%, 21%)' }}></div>
                        <NoteActions/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;