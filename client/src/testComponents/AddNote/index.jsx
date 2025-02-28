import { useState } from "react";
import { useMutation } from "@apollo/client";

import { QUERY_ME } from "../../utils/queries";
import { CREATE_NOTE } from "../../utils/mutations";

import '../Dashboard/index.css';

function AddNote() {
    const [formData, setFormData] = useState({
        title: '',
        text: '',
        tags: []
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
                    input: {
                        ...formData,
                    }
                }
            });

            setFormData({
                title: '',
                text: '',
                tags: []
                // tags: 'Add tags separated by commas (e.g. Work, Planning)'
            });
        } 
        catch (err) {
            console.error(err)
        }
    }

    return (
        // <form id="testAddNoteForm" className="col-6 bg-secondary bg-gradient" onSubmit={handleFormSubmit}>
        //     <div 
        //         className="text-light" 
        //         style={{ 
        //             // maxWidth: '45.75vw', 
        //             // width: '100%', 
        //             maxHeight: '56.88vw', 
        //         }}
        //     >

        //         <div>
        //             <input 
        //                 type="text" 
        //                 name="title"
        //                 value={formData.title}
        //                 placeholder="Enter a title..."
        //                 onChange={handleInputChange}
        //             />
        //             {/* <h3>Enter a title...</h3> */}
        //         </div>

        //         <div className="row row-cols-1 row-cols-md-2 mt-3">
        //             <div className="col">
        //                 <span className="me-2"><i class="fa-solid fa-tag"></i></span>
        //                 Tags
        //             </div>
        //             <div className="col">Dev, React</div>
        //             <div className="col">
        //                 <span className="me-2"><i class="fa-solid fa-clock"></i></span>
        //                 Last edited
        //             </div>
        //             <div className="col">Not yet saved</div>
        //         </div>


        //         <div className="mt-4">
        //             <textarea 
        //                 className="bg-info-subtle text-light w-100"
        //                 type="text"
        //                 name="text"
        //                 value={formData.text}
        //                 placeholder="Start typing your note here..."
        //                 onChange={handleInputChange}
        //                 style={{ 
        //                     height: '46.38vw', 
        //                     border: 'none', 
        //                     resize: 'none'
        //                 }}
        //             ></textarea>
        //         </div>

        //         <div className="d-flex flex-column flex-md-row mt-3">
        //             <button 
        //                 form="testUpdateNoteForm"
        //                 className="btn btn-primary me-md-3 mb-2 mb-md-0"
        //                 type="submit"
        //                 style={{ 
        //                     backgroundColor: '#F63366',
        //                     borderColor: '#ba0837'
        //                 }}
        //             >
        //                 Save Note
        //             </button>
        //             <button className="btn btn-secondary">
        //                 Cancel
        //             </button>
        //         </div>
        //     </div>
        // </form>


        // Removed 'col'
        <form 
            id="testUpdateNoteForm" 
            className="text-light p-0 pt-4 single-note" 
            onSubmit={handleFormSubmit}
            style={{ 
                // border: '2px solid rgba(0, 255, 4, 0.1)' ,
                borderTop: '1px solid hsl(0, 0.00%, 36%)',
            }}
        >
            <div className="container-fluid text-light">
                <textarea
                    className="ml-background text-light"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter a title..."
                    style={{ border: 'none', resize: 'none' }}
                >
                </textarea>

                <div className="row mt-3" style={{ fontSize: '14px' }}>
                    <div className="col-3">
                        <span className="me-2"><i class="fa-solid fa-tag"></i></span>
                        Tags
                    </div>
                    <div className="col-auto">
                        <input 
                            type="text" 
                            name="tags"
                            value={formData.tags}
                            onChange={handleInputChange}
                            placeholder="Tags..."/>
                    </div>
                </div>
                <div className="row mt-2" style={{ fontSize: '14px' }}>
                    <div className="col-3">
                        <span className="me-2"><i class="fa-solid fa-clock"></i></span>
                        Last edited
                    </div>
                    <div className="col-auto">Not yet saved</div>
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

export default AddNote;