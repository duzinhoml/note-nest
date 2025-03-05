import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { QUERY_ME } from "../../utils/queries.js";
import { UPDATE_NOTE } from "../../utils/mutations.js";
import { DELETE_NOTE } from "../../utils/mutations.js";

import { useSidebar } from "../../context/SidebarContext.jsx";
import { useNoteList } from "../../context/NoteListContext";

import '../Dashboard/index.css';
import './index.css';

// TO BE REMOVED
import Auth from '../../utils/auth.js';
// 

function NoteActions() {
    const navigate = useNavigate();
    const { noteSelection } = useSidebar();
    const { currentNote, setCurrentNote } = useNoteList();

    const { _id } = currentNote || {};
    const noteId = _id;

    const [updateNote, { error: updateError }] = useMutation(UPDATE_NOTE, {
        refetchQueries: [
            QUERY_ME
        ]
    });

    const [deleteNote, { error: deleteError }] = useMutation(DELETE_NOTE, {
        refetchQueries: [
            QUERY_ME
        ]
    });

    const handleDeleteNote = async () => {
        try {
            await deleteNote({
                variables: {
                    noteId
                }
            });

            setCurrentNote(null);
            navigate('/');
        } 
        catch (err) {
            console.error(err);
        }
    }

    const handleArchiveNote = async () => {
        try {
            await updateNote({
                variables: {
                    noteId,
                    input: {
                        isArchived: true
                    }
                }
            });

            setCurrentNote(null);
            navigate('/');
        } 
        catch (err) {
            console.error(err)
        }
    };

    const handleUnarchiveNote = async () => {
        try {
            await updateNote({
                variables: {
                    noteId,
                    input: {
                        isArchived: false
                    }
                }
            });

            setCurrentNote(null);
            navigate('/');
        } 
        catch (err) {
            console.error(err)
        }
    }

    return (
        // Removed 'col-3'
        <div 
            className="text-light p-0 pt-4 note-actions" 
            style={{ 
                // border: '2px solid rgba(0, 255, 4, 0.1)',
                borderTop: '1px solid hsl(0, 0.00%, 36%)',
            }}
            
        >

            <div className="container-fluid">
                <div className="d-flex flex-column justify-content-between" style={{ height: '86vh' }}>
                    <div>
                        {noteSelection === 'all' ? 
                            <button className="btn mb-2 text-start text-light w-100 note-actions-archive" onClick={() => handleArchiveNote()}>
                                <span className="me-2"><i class="fa-solid fa-box-archive"></i></span>
                                Archive Note
                            </button>
                            : 
                            <button className="btn mb-2 text-start text-light w-100 note-actions-archive" onClick={() => handleUnarchiveNote()}>
                                <span className="me-2"><i class="fa-solid fa-box-archive"></i></span>
                                Unarchive Note
                            </button>
                        }
                        <button className="btn text-start text-light w-100 note-actions-delete" onClick={() => handleDeleteNote()}>
                            <span className="me-2"><i class="fa-solid fa-trash"></i></span>
                            Delete Note
                        </button>
                    </div>

                    {/* TO BE REMOVED */}
                    <button 
                        type="button"
                        className={`btn btn-light mt-2 text-start w-100 border-secondary`}
                        onClick={() => Auth.logout()}
                        style={{ borderColor: '#ba0837', cursor: 'pointer' }}
                    >
                        Logout
                    </button>
                    {/*  */}

                </div>
            </div>
        </div>
    );
};

export default NoteActions;