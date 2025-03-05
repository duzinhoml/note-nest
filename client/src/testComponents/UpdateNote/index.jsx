import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { QUERY_ME } from "../../utils/queries";
import { UPDATE_NOTE } from "../../utils/mutations";
import { DELETE_TAG_FROM_NOTE } from "../../utils/mutations";

import { useNoteList } from "../../context/NoteListContext";

import '../Dashboard/index.css';
import '../Notes/index.css';
import '../SingleNote/index.css';

function UpdateNote() {
    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);
    const { currentNote, setCurrentNote } = useNoteList();

    const { _id, title, text } = currentNote || {};
    const noteId = _id;

    const [formData, setFormData] = useState({
        text: '',
        tags: ''
    });

    
    useEffect(() => {
        if (currentNote) {
            setFormData({
                text: currentNote.text,
                tags: currentNote.tags.join(', ')
            })
        }
    }, [currentNote]);
    
    const updatedTitle = formData.text ? formData.text.split('\n') : '';
    const updatedTags = formData.tags || '' ? formData.tags.split(', ') : [];

    const [updateNote, { error: updateError }] = useMutation(UPDATE_NOTE, {
        refetchQueries: [
            QUERY_ME
        ]
    });

    const [deleteTagFromNote, { error: deleteTagError }] = useMutation(DELETE_TAG_FROM_NOTE, {
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
                        title: updatedTitle[0],
                        text: formData.text,
                        tags: updatedTags
                    }
                }
            });

            setCurrentNote(null);
            setFormData({
                text: '',
                tags: ''
            })
            navigate('/testing');
        } 
        catch (err) {
            console.error(err)
        }
    }

    const toggleTagEdit = () => {
        if (!isEditing) {
            setIsEditing(true);
        }
        else {
            setIsEditing(false);
        }
    };

    const toggleTagDelete = async (tagName) => {
        try {
            await deleteTagFromNote({
                variables: {
                    noteId,
                    tagName
                }
            });

            setCurrentNote(null);
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
                <h3>{updatedTitle[0] ? updatedTitle[0] : currentNote.title}</h3>

                <div className="row mt-3" style={{ fontSize: '14px' }}>
                    <div className="col-3">
                        <span className="me-2"><i class="fa-solid fa-tag"></i></span>
                        Tags
                    </div>
                    <div className="col ps-3">
                        {currentNote.tags.length === 0 ? (
                            <input 
                                className="ml-background text-light border-0 note-input"
                                type="text" 
                                name="tags"
                                value={formData.tags}
                                onChange={handleInputChange}
                                placeholder="Add tags separated by commas (e.g. Work, Planning)"
                                autoComplete="off"
                                style={{ width: '77%' }}
                            />
                        ) : (
                            !isEditing ? 
                                currentNote.tags.map(tag => (
                                    <span key={tag} className="text-light me-1 rounded p-1 note-tags" onClick={() => toggleTagDelete(tag)}>{tag}</span>
                                )) : (
                                    <input 
                                        className="ml-background text-light border-0 note-input"
                                        type="text" 
                                        name="tags"
                                        value={formData.tags}
                                        onChange={handleInputChange}
                                        placeholder="Add tags separated by commas (e.g. Work, Planning)"
                                        autoComplete="off"
                                        style={{ width: '77%' }}
                                    />
                                )
                        )}
                        {!isEditing && currentNote.tags.length ? <i class="fa-solid fa-pen-to-square ms-1" style={{ cursor: 'pointer', fontSize: '16px' }} onClick={() => toggleTagEdit()}></i> : ''}
                    </div>
                </div>
                <div className="row mt-2" style={{ fontSize: '14px' }}>
                    <div className="col-3">
                        <span className="me-2"><i class="fa-solid fa-clock"></i></span>
                        Last edited
                    </div>
                    <div className="col-auto ps-3">{currentNote.updateDate}</div>
                </div>

                <hr/>

                <div className="mt-3">
                    <textarea 
                        className="ml-background w-100 text-light p-1 note-input"
                        type="text"
                        name="text"
                        value={formData.text}
                        placeholder="Start typing your note here..."
                        onChange={handleInputChange}
                        style={{
                            height: '34vw',
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