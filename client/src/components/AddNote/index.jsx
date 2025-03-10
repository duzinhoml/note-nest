import { useMutation } from "@apollo/client";

import { QUERY_ME } from "../../utils/queries.js";
import { CREATE_NOTE } from "../../utils/mutations.js";

import { useFormData } from "../../context/FormDataContext.jsx";
import { useInputRef } from "../../context/InputRefContext.jsx";
import { useNotes } from "../../context/NotesContext.jsx";

import '../Dashboard/index.css';
import '../SingleNote/index.css';

function AddNote() {
    const { inputTextRef } = useInputRef();
    const { setIsCreating } = useNotes();

    const { formData, setFormData } = useFormData();
    // const [formData, setFormData] = useState({
    //     text: '',
    //     tags: ''
    // });


    const title = formData.text.split('\n');
    const tags = formData.tags ? formData.tags.split(', ') : [];

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
                        title: title[0],
                        text: formData.text,
                        tags: tags
                    }
                }
            });

            setFormData({
                text: '',
                tags: ''
            });

            setIsCreating(false);
        } 
        catch (err) {
            console.error(err)
        }
    };

    const toggleCancelNote = () => {
        setFormData({
            text: '',
            tags: ''
        });
        
        setIsCreating(false);
    }

    return (
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
                <h3 className="note-title">{title[0] ? title[0] : 'Note Title'}</h3>

                <div className="row mt-3" style={{ fontSize: '14px' }}>
                    <div className="col-3">
                        <span className="me-2"><i class="fa-solid fa-tag"></i></span>
                        Tags
                    </div>
                    <div className="col">
                        <input 
                            className="ml-background text-light border-0 ps-1 note-input"
                            type="text" 
                            name="tags"
                            value={formData.tags}
                            onChange={handleInputChange}
                            placeholder="Add tags separated by commas (e.g. Work, Planning)"
                            autoComplete="off"
                            style={{ width: '77%' }}
                        />
                    </div>
                </div>
                <div className="row mt-3" style={{ fontSize: '14px' }}>
                    <div className="col-3">
                        <span className="me-2"><i class="fa-solid fa-clock"></i></span>
                        Last edited
                    </div>
                    <div className="col-auto ps-3">Not yet saved</div>
                </div>

                <hr/>

                <div className="mt-3">
                    <textarea 
                        ref={inputTextRef}
                        className="ml-background w-100 text-light p-1 note-input"
                        type="text"
                        name="text"
                        value={formData.text}
                        placeholder="Start typing your note here..."
                        autoComplete="off"
                        onChange={handleInputChange}
                        style={{
                            height: '34vw',
                            border: 'none',
                            resize: 'none'
                        }}
                    ></textarea>
                </div>

                <hr />

                <div className="my-3">
                    <button 
                        form="testUpdateNoteForm"
                        className="btn text-light me-3 confirm-note"
                        type="submit"
                    >
                        Save Note
                    </button>
                    <button className="btn text-light cancel-note" onClick={() => toggleCancelNote()}>Cancel</button>
                </div>

            </div>
        </form>
    );
};

export default AddNote;