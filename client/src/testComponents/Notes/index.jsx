import { useNavigate } from 'react-router-dom';

import { useNoteList } from "../../context/NoteListContext";

function Notes({ notes }) {
    console.log(notes);
    const navigate = useNavigate();

    const { currentNote, setCurrentNote } = useNoteList();

    const toggleCurrentNote = (note) => {
        if (currentNote && currentNote._id === note._id) {
            setCurrentNote(null);
            navigate('/testing');
        }
        else {
            setCurrentNote(note);
            navigate(`/notes/${note._id}`);
        }
    };

    return (
        <div 
            className="text-light"
        >
                <hr style={{ width: '500%', marginLeft: '12px' }}/>

            <button
                className="btn btn-primary"
                style={{ 
                    maxWidth: '16.74vw',
                    width: '100%',
                    maxHeight: '2.95vw',
                    height: '100%',
                    backgroundColor: '#F63366',
                    borderColor: '#ba0837',
                    margin: '0 16px 16px' 
                }}
            >
                + Create New Note
            </button>

            <div 
                id="notes" 
                className="m-3 d-flex flex-column"
                style={{
                    maxWidth: '16.74vw',
                    width: '100%',
                    maxHeight: '7.64vh',
                    height: '100%',
                }}>
                {/* <h5>React Performance Optimization</h5>
                <div className="d-flex flex-wrap" style={{ fontSize: '12px' }}>
                    <p className="me-2 mb-2 p-1 bg-secondary rounded">Dev</p>
                    <p className="me-2 mb-2 p-1 bg-secondary rounded">React</p>
                </div>
                <small>29 Oct 2024</small> */}
                {notes &&
                    notes.map(note => (
                        <div key={note._id}>
                            <h5 
                                className="mt-3" 
                                onClick={() => toggleCurrentNote(note)}
                            >
                                {note.title}
                            </h5>
                            <div className="d-flex" style={{ fontSize: '12px' }}>
                                {note.tag ? (
                                    <>
                                        <p className="me-2 mb-2 p-1 bg-secondary rounded">{note.tag}</p>
                                        <p className="me-2 mb-2 p-1 bg-secondary rounded">{note.tag}</p>
                                    </>
                                ) : ('')}
                            </div>
                            <small>{note.createdAt || '28 Oct 2024'}</small>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Notes;