import { useState } from "react";
import { useMutation } from "@apollo/client";

import { QUERY_ME } from "../../utils/queries";
import { CREATE_NOTE } from "../../utils/mutations";

function AddNote() {
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
        <form id="testAddNoteForm" onSubmit={handleFormSubmit}>
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
                    <div className="col">Not yet saved</div>
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
                        Save Note
                    </button>
                    <button className="btn btn-secondary">
                        Cancel
                    </button>
                </div>
            </div>
        </form>
    );
};

export default AddNote;