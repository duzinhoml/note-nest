import { useState } from "react";
import { useMutation } from "@apollo/client";

import { QUERY_NOTES, QUERY_FOLDERS } from "../../utils/queries";
import { CREATE_NOTE } from "../../utils/mutations";

function AddNote({ folderId }) {
    const [formData, setFormData] = useState({
        title: '',
        text: ''
    });

    const [createNote, { error }] = useMutation(CREATE_NOTE, {
        refetchQueries: [
            QUERY_FOLDERS,
            QUERY_NOTES
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
                    input: {
                        ...formData,
                        folderId
                    }
                }
            });

            setFormData({
                title: '',
                text: ''
            });

            document.getElementById('closeNoteModalBtn').click();
        } 
        catch (err) {
            console.error(err)
        }
    }



    return (
        <>
            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">Create a New Note</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" id="closeNoteModalBtn" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form onSubmit={handleFormSubmit}>
                                <div class="mb-3">
                                    <label for="noteTitleInput" class="form-label">Note Title</label>
                                    <input 
                                        type="text"
                                        className="form-control" 
                                        id="noteTitleInput" 
                                        name="title"
                                        placeholder="Please provide a title for the note..." 
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div class="mb-3">
                                    <label for="folderDescriptionInput" class="form-label">Note Content</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="noteTextInput" 
                                        name="text"
                                        placeholder="Please enter the content of the note..."
                                        value={formData.text}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                    <button type="submit" class="btn btn-primary">Create Note</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddNote;