import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { QUERY_ME } from "../../../utils/queries.js";
import { UPDATE_NOTE } from "../../../utils/mutations.js";

import { useOffcanvas } from "../../../context/OffcanvasContext.jsx";
import { useNoteList } from "../../../context/NoteListContext.jsx";

function UpdateNote({ offcanvasWidth, titleRef, textRef, handleTextAreaInput }) {
    const navigate = useNavigate();
    const { isOffcanvasOpen } = useOffcanvas();
    const { currentNote, setCurrentNote } = useNoteList();

    const { _id, title, text } = currentNote || {};
    const noteId = _id;

    console.log(`Update Note Comp: ${noteId}`)

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

    console.log(`Update Note Title: ${formData.title}`)
    console.log(`Update Note Text: ${formData.text}`)

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
            navigate('/');
        } 
        catch (err) {
            console.error(err)
        }
    }

    return (
        <form id="updateNoteForm" onSubmit={handleFormSubmit} className="w-100">
            <div 
                id="main-content" 
                className="flex-grow-1 p-3 text-light" 
                style={{ marginLeft: isOffcanvasOpen ? `${offcanvasWidth}px` : "0", transition: "margin-left 0.3s ease-in-out" }}
            >
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label" style={{ fontSize: '20px'}}>Note Title</label>
                    <textarea 
                        ref={titleRef}
                        type="text"
                        class="form-control bg-secondary" 
                        id="exampleFormControlTextarea1"
                        name='title'
                        value={formData.title}
                        rows={1}
                        placeholder="Please provide a title for the note..."
                        onChange={handleInputChange}
                        onInput={() => handleTextAreaInput(titleRef)}
                        style={{ fontSize: isOffcanvasOpen && offcanvasWidth === 150 ? '0.865rem' : '16px', overflow: 'hidden' }}
                    ></textarea>
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label" style={{ fontSize: '20px'}}>Note Content</label>
                    <textarea 
                        ref={textRef}
                        type="text"
                        class="form-control bg-secondary" 
                        id="exampleFormControlTextarea2" 
                        name='text'
                        value={formData.text}
                        rows={3} 
                        placeholder="Please enter the content of the note..."
                        onChange={handleInputChange}
                        onInput={() => handleTextAreaInput(textRef)}
                        style={{ fontSize: isOffcanvasOpen && offcanvasWidth === 150 ? '0.865rem' : '16px', overflow: 'hidden' }}
                    ></textarea>
                </div>
            </div>
        </form>
    );
};

export default UpdateNote;