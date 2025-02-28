import { useNavigate } from 'react-router-dom';

import { useSidebar } from '../Sidebar/context.jsx';
import { useNoteList } from "../../context/NoteListContext.jsx";

import '../Dashboard/index.css';

function Notes({ notes }) {
    const navigate = useNavigate();

    const { noteSelection, tagSelection } = useSidebar();
    const { currentNote, setCurrentNote } = useNoteList();

    const taggedNotes = notes.filter(note => note.tags.includes(tagSelection));

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

    const archivedNotes = notes.filter(note => note.isArchived === true);
    const activeNotes = notes.filter(note => note.isArchived === false);

    console.log(notes)
    console.log(archivedNotes)
    console.log(activeNotes);

    return (
        // Removed 'col-3'
        <div 
            className="p-0 pt-4 notes" 
            style={{ 
                // border: '5px solid rgba(0, 255, 4, 0.1)',
                borderTop: '1px solid hsl(0, 0.00%, 36%)',
            }}
        >
            <div className="container-fluid d-flex flex-column">
                <button 
                    className="btn btn-danger text-light mb-2 p-2"
                    style={{
                        backgroundColor: '#F63366',
                        borderColor: '#ba0837'
                    }}
                >
                    + Create New Note
                </button>

                <div>
                    <ul className="list-group list-group-flush">
                        {/* {tagSelection && taggedNotes ? (
                            taggedNotes.map(note => (
                                <li key={note._id} className={`list-group-item mt-2 p-2 ${currentNote && currentNote._id === note._id? 'bg-dark bg-gradient' : 'bg-secondary'} text-light border-bottom-0 rounded`} onClick={() => toggleCurrentNote(note)} style={{ cursor: 'pointer' }}>
                                    <h5>{note.title}</h5>
                                    {note.tags?
                                        note.tags.map(tag => (
                                            <div className="d-inline-flex flex-wrap mt-2">
                                                <p className="me-2 p-1 bg-secondary bg-gradient rounded" style={{ fontSize: '12px' }}>{tag}</p>
                                            </div>
                                        )) : ('')
                                    }
                                    <small className='mt-0 d-block'>{note.createdAt}</small>
                                </li>
                            ))
                        ) : (
                            notes &&
                                notes.map(note => (
                                    <li key={note._id} className={`list-group-item mt-2 p-2 ${currentNote && currentNote._id === note._id? 'bg-dark bg-gradient' : 'bg-secondary'} text-light border-bottom-0 rounded`} onClick={() => toggleCurrentNote(note)} style={{ cursor: 'pointer' }}>
                                        <h5>{note.title}</h5>
                                        {note.tags?
                                            note.tags.map(tag => (
                                                <div className="d-inline-flex flex-wrap mt-2">
                                                    <p className="me-2 p-1 bg-secondary bg-gradient rounded" style={{ fontSize: '12px' }}>{tag}</p>
                                                </div>
                                            )) : ('')
                                        }
                                        <small className='mt-0 d-block'>{note.createdAt}</small>
                                    </li>
                                ))
                            )  
                        } */}
                        {notes && noteSelection === 'all' ? (
                            activeNotes.map(note => (
                                <li key={note._id} className={`list-group-item mt-2 p-2 ${currentNote && currentNote._id === note._id? 'bg-dark bg-gradient' : 'bg-secondary'} text-light border-bottom-0 rounded`} onClick={() => toggleCurrentNote(note)} style={{ cursor: 'pointer' }}>
                                    <h5>{note.title}</h5>
                                    {note.tags?
                                        note.tags.map(tag => (
                                            <div className="d-inline-flex flex-wrap mt-2">
                                                <p className="me-2 p-1 bg-secondary bg-gradient rounded" style={{ fontSize: '12px' }}>{tag}</p>
                                            </div>
                                        )) : ('')
                                    }
                                    <small className='mt-0 d-block'>{note.createdAt}</small>
                                </li>
                            ))
                        ) : notes && noteSelection === 'archived' ? (
                            archivedNotes.map(note => (
                                <li key={note._id} className={`list-group-item mt-2 p-2 ${currentNote && currentNote._id === note._id? 'bg-dark bg-gradient' : 'bg-secondary'} text-light border-bottom-0 rounded`} onClick={() => toggleCurrentNote(note)} style={{ cursor: 'pointer' }}>
                                    <h5>{note.title}</h5>
                                    {note.tags?
                                        note.tags.map(tag => (
                                            <div className="d-inline-flex flex-wrap mt-2">
                                                <p className="me-2 p-1 bg-secondary bg-gradient rounded" style={{ fontSize: '12px' }}>{tag}</p>
                                            </div>
                                        )) : ('')
                                    }
                                    <small className='mt-0 d-block'>{note.createdAt}</small>
                                </li>
                            ))
                        ) : '' 
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Notes;