import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSidebar } from '../../context/SidebarContext.jsx';
import { useInputRef } from '../../context/InputRefContext.jsx';
import { useNotes } from '../../context/NotesContext.jsx';
import { useNoteList } from "../../context/NoteListContext.jsx";

import NoteList from './NoteList.jsx';

import '../Dashboard/index.css';

function Notes({ notes }) {
    const navigate = useNavigate();

    const { tagSelection } = useSidebar();
    const { inputTextRef } = useInputRef();
    const { setIsCreating } = useNotes();
    const { currentNote, setCurrentNote } = useNoteList();

    const toggleCurrentNote = (note) => {
        if (currentNote && currentNote._id === note._id) {
            setCurrentNote(null);
            navigate('/');
        }
        else {
            setCurrentNote(note);
            navigate(`/note/${note._id}`);
        }
    };

    useEffect(() => {
        if ((currentNote && tagSelection) && currentNote.tags.includes(tagSelection)) {
            navigate(`/note/${currentNote._id}/tag/${tagSelection}`);
        }
        else if ((currentNote && tagSelection) && !currentNote.tags.includes(tagSelection)) {
            setCurrentNote(null);
            navigate(`/tag/${tagSelection}`);
        }
        else if (currentNote && !tagSelection) {
            navigate(`/note/${currentNote._id}`);
        }
        else if (!currentNote && tagSelection) {
            navigate(`/tag/${tagSelection}`);
        }
    }, [currentNote, tagSelection]);

    const toggleCreate = () => {
        setCurrentNote(null);
        setIsCreating(true);

        if (inputTextRef.current) {
            inputTextRef.current.focus();
        }
    }

    const archivedNotes = notes.filter(note => note.isArchived === true);
    const activeNotes = notes.filter(note => note.isArchived === false);

    const archivedTaggedNotes = archivedNotes.filter(note => note.tags.includes(tagSelection));
    const activeTaggedNotes = activeNotes.filter(note => note.tags.includes(tagSelection));

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
                    onClick={() => toggleCreate()}
                    style={{
                        backgroundColor: '#F63366',
                        borderColor: '#ba0837'
                    }}
                >
                    + Create New Note
                </button>

                <div>
                    <ul className="list-group list-group-flush">
                        <NoteList 
                            notes={notes} 
                            activeNotes={activeNotes}
                            archivedNotes={archivedNotes}
                            activeTaggedNotes={activeTaggedNotes} 
                            archivedTaggedNotes={archivedTaggedNotes} 
                            toggleCurrentNote={toggleCurrentNote} 
                        />
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Notes;