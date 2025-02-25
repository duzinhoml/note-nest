// import { useNoteList } from "../../context/NoteListContext.jsx";

import Sidebar from "../Sidebar/index.jsx";
import Header from "../Header/index.jsx";
import Notes from "../Notes/index.jsx";
import SingleNote from "../SingleNote/index.jsx";
import NoteActions from "../NoteActions/index.jsx";

function Dashboard({ notes, heading }) {

    return (
        <div className='d-flex'>
            <Sidebar />
            <div 
                className="vertical-line" 
                style={{
                    width: '1px',
                    backgroundColor: 'rgb(91, 91, 91)',
                    height: '100vh',
                    margin: '0 2px'
                }} 
            />
            <div className="d-flex flex-column flex-grow-1">
                <Header heading={heading}/>
                <div className="d-flex flex-grow-1">
                    <Notes notes={notes}/>
                    <div
                        className="vertical-line"
                        style={{
                            width: '1px',
                            backgroundColor: 'rgb(91, 91, 91)',
                            height: '100%',
                            margin: '0 2px'
                        }}
                    />
                    <SingleNote/>
                    <NoteActions/>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;