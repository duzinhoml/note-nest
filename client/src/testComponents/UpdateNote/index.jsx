import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";

import { QUERY_ME } from "../../utils/queries";
import { UPDATE_NOTE } from "../../utils/mutations";

import { useNoteList } from "../../context/NoteListContext";

function UpdateNote() {
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

    const [updateNote, { error }] = useMutation(UPDATE_NOTE, {
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
            window.location.reload();
        } 
        catch (err) {
            console.error(err)
        }
    }

    return (
        <form id="testUpdateNoteForm" onSubmit={handleFormSubmit}>
            <div 
                className="text-light" 
                style={{ 
                    maxWidth: '40.75vw', 
                    width: '100%', 
                    maxHeight: '56.88vw', 
                    margin: '0 16px 16px' 
                }}
            >
                    <hr style={{ width: '100%', border: 'none' }}/>

                <div>
                    <input 
                        type="text" 
                        name="title"
                        value={formData.title}
                        placeholder="Enter a title..."
                        onChange={handleInputChange}
                    />
                    {/* <h3>Enter a title...</h3> */}
                </div>

                <div className="row row-cols-1 row-cols-md-2 mt-3">
                    <div className="col">
                        <span className="me-2"><i class="fa-solid fa-tag"></i></span>
                        Tags
                    </div>
                    <div className="col">Dev, React</div>
                    <div className="col">
                        <span className="me-2"><i class="fa-solid fa-clock"></i></span>
                        Last edited
                    </div>
                    <div className="col">{currentNote ? currentNote.createdAt : 'Not yet saved'}</div>
                </div>

                <hr className="mt-4" style={{ width: '100%' }}/>

                <div className="mt-4">
                    <textarea 
                        className="ml-background text-light"
                        type="text"
                        name="text"
                        value={formData.text}
                        placeholder="Start typing your note here..."
                        onChange={handleInputChange}
                        style={{ 
                            maxWidth: '37.5vw', 
                            width: '100%', 
                            height: '46.38vw', 
                            border: 'none', 
                            resize: 'none'
                        }}
                    ></textarea>
                </div>

                <div className="d-flex flex-column flex-md-row mt-3">
                    <button 
                        form="testUpdateNoteForm"
                        className="btn btn-primary me-md-3 mb-2 mb-md-0"
                        type="submit"
                        style={{ 
                            backgroundColor: '#F63366',
                            borderColor: '#ba0837'
                        }}
                    >
                        Update Note
                    </button>
                    <button className="btn btn-secondary">
                        Cancel
                    </button>
                </div>
            </div>
        </form>
    );
};

export default UpdateNote;