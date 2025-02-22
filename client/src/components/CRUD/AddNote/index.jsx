import { useState } from "react";
import { useMutation } from "@apollo/client";

import { QUERY_ME } from "../../../utils/queries";
import { CREATE_NOTE } from "../../../utils/mutations";

import { useOffcanvas } from "../../../context/OffcanvasContext.jsx";

function AddNote({ folder, offcanvasWidth, titleRef, textRef, handleTextAreaInput }) {
    const { isOffcanvasOpen } = useOffcanvas();

    const { _id } = folder || {};
    const folderId = _id;

    const [formData, setFormData] = useState({
        title: '',
        text: ''
    });

    const [createNote, { error }] = useMutation(CREATE_NOTE, {
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
            await createNote({
                variables: {
                    folderId,
                    input: {
                        ...formData,
                    }
                }
            });

            setFormData({
                title: '',
                text: ''
            });
        } 
        catch (err) {
            console.error(err)
        }
    }



    return (
        <form id="addNoteForm" onSubmit={handleFormSubmit} className="w-100">
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

export default AddNote;