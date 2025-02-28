import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { QUERY_ME } from "../../utils/queries.js";
import { UPDATE_NOTE } from "../../utils/mutations.js";
import { DELETE_NOTE } from "../../utils/mutations.js";

import { useNoteList } from "../../context/NoteListContext";

import '../Dashboard/index.css';

function NoteActions() {
    const navigate = useNavigate();
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
            navigate('/testing');
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
            })

            console.log('Successfully archived')
        } 
        catch (err) {
            console.error(err)
            console.log('Failed to archive')
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

            <div className="container-fluid d-flex flex-column">
                <div>
                    <button className="btn btn-secondary mb-2 text-start w-100 border-secondary" onClick={() => handleArchiveNote()}>
                        <span className="me-2"><i class="fa-solid fa-box-archive"></i></span>
                        Archive Note
                    </button>
                    <button className="btn text-start text-light w-100" onClick={() => handleDeleteNote()} style={{ backgroundColor: '#F63366', borderColor: '#ba0837' }}>
                        <span className="me-2"><i class="fa-solid fa-trash"></i></span>
                        Delete Note
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NoteActions;