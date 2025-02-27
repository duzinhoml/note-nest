import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { QUERY_ME } from "../../utils/queries";
import { DELETE_NOTE } from "../../utils/mutations";

import { useNoteList } from "../../context/NoteListContext";

function NoteActions() {
    const navigate = useNavigate();
    const { currentNote, setCurrentNote } = useNoteList();

    const { _id } = currentNote || {};
    const noteId = _id;

    const [deleteNote, { error }] = useMutation(DELETE_NOTE, {
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

    return (
        <div 
            className="text-light col-3 p-0 pt-4" 
            style={{ 
                // border: '2px solid rgba(0, 255, 4, 0.1)',
                borderTop: '1px solid hsl(0, 0.00%, 36%)',
            }}
            
        >

            <div className="container-fluid d-flex flex-column">
                <div>
                    <button className="btn btn-secondary mb-2 text-start w-100 border-secondary">
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