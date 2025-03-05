import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSidebar } from '../../context/SidebarContext.jsx';
import { useInputRef } from '../../context/InputRefContext.jsx';
import { useNotes } from '../../context/NotesContext.jsx';
import { useNoteList } from "../../context/NoteListContext.jsx";

import InteractList from './InteractList.jsx';

import '../Dashboard/index.css';
import './index.css';

function Decision({ notes }) {
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
            className="p-0 pt-4 ps-4 settings-decision" 
            style={{ 
                // border: '5px solid rgba(0, 255, 4, 0.1)',
                borderTop: '1px solid hsl(0, 0.00%, 36%)',
            }}
        >
            <div className="container-fluid d-flex flex-column">

                <div className='text-light'>
                    <h4>Change Password</h4>
                    <form 
                        id="updatePasswordForm" 
                        className="text-light p-0 pt-4"
                        // onSubmit={handleFormSubmit}
                        style={{ 
                            // border: '2px solid rgba(0, 255, 4, 0.1)' ,
                            borderTop: '1px solid hsl(0, 0.00%, 36%)',
                        }}
                    >
                        <input 
                            className='form-control ps-2 mb-3 decision-input'
                            type="text" 
                            name="password"
                            placeholder='Enter old password'
                            autoComplete="off"
                            style={{ width: '60%' }}
                        />
                        <input 
                            className='form-control ps-2 mb-3 decision-input'
                            type="text" 
                            name="password"
                            placeholder='Enter new password'
                            autoComplete="off"
                            style={{ width: '60%' }}
                        />
                        <input 
                            className='form-control ps-2 decision-input'
                            type="text" 
                            name="password"
                            placeholder='Confirm new password'
                            autoComplete="off"
                            style={{ width: '60%' }}
                        />

                        <div className="mt-3">
                            <button 
                                form="testUpdateNoteForm"
                                className="btn text-light me-3"
                                type="submit"
                                style={{ 
                                    backgroundColor: '#F63366',
                                    borderColor: '#ba0837'
                                }}
                            >
                                Save Note
                            </button>
                            <button className="btn btn-secondary" >Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Decision;