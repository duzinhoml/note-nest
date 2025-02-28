import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { QUERY_ME } from "../../utils/queries";
import { UPDATE_NOTE } from "../../utils/mutations";

import { useNoteList } from "../../context/NoteListContext";

function UpdateNote() {
    const navigate = useNavigate();
    const { currentNote, setCurrentNote } = useNoteList();

    const { _id, title, text } = currentNote || {};
    const noteId = _id;

    const [formData, setFormData] = useState({
        title: '',
        text: ''
    });

    useEffect(() => {
        if (currentNote) {
            setFormData({
                title,
                text
            })
        }
    }, [currentNote]);

    const [updateNote, { error: updateError }] = useMutation(UPDATE_NOTE, {
        refetchQueries: [
            QUERY_ME
        ]
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            await updateNote({
                variables: {
                    noteId,
                    input: {
                        ...formData
                    }
                }
            });

            setCurrentNote(null);
            setFormData({
                title: '',
                text: ''
            })
            navigate('/testing');
        } 
        catch (err) {
            console.error(err)
        }
    }

    return (
        // Removed 'col'
        <form 
            id="testUpdateNoteForm" 
            className="text-light p-0 pt-4 single-note" 
            onSubmit={handleFormSubmit}
            style={{ 
                // border: '2px solid rgba(0, 255, 4, 0.1)',
                borderTop: '1px solid hsl(0, 0.00%, 36%)'
            }}
        >
            <div className="container-fluid text-light">
                <h3>{formData.title}</h3>

                <div className="row mt-3" style={{ fontSize: '14px' }}>
                    <div className="col-3">
                        <span className="me-2"><i class="fa-solid fa-tag"></i></span>
                        Tags
                    </div>
                    <div className="col-auto">
                        {currentNote.tags.length === 0 ? (
                            'Add tags'
                        ) : (
                            currentNote.tags.map(tag => (
                                <span key={tag} className="badge bg-secondary text-light me-1">{tag}</span>
                            ))
                        )}
                    </div>
                </div>
                <div className="row mt-2" style={{ fontSize: '14px' }}>
                    <div className="col-3">
                        <span className="me-2"><i class="fa-solid fa-clock"></i></span>
                        Last edited
                    </div>
                    <div className="col-auto">{currentNote.createdAt}</div>
                </div>

                <hr/>

                <div className="mt-3">
                    <textarea 
                        className="ml-background w-100 text-light"
                        type="text"
                        name="text"
                        value={formData.text}
                        placeholder="Start typing your note here..."
                        onChange={handleInputChange}
                        style={{
                            height: '32vw',
                            border: 'none',
                            resize: 'none'
                        }}
                    ></textarea>
                </div>

                <hr />

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
                    <button className="btn btn-secondary">Cancel</button>
                </div>

            </div>
        </form>
    );
};

export default UpdateNote;