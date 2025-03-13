import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { QUERY_ME } from "../../utils/queries.js";
import { CREATE_NOTE } from "../../utils/mutations.js";

import { useFormData } from "../../context/FormDataContext.jsx";
import { useInputRef } from "../../context/InputRefContext.jsx";
import { useNotes } from "../../context/NotesContext.jsx";

import '../../components/Dashboard/index.css';
import '../../components/SingleNote/index.css';
import './index.css';

function AddNote() {
    const navigate = useNavigate();
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
        navigate('/');
    }

    return (
        <form 
            className="text-light p-0" 
            onSubmit={handleFormSubmit}
        >
            <div className="my-3 d-flex align-items-center justify-content-between">
                <div className="ms-1" onClick={() => toggleCancelNote()}>
                    <button className="btn text-light small-cancel-note">
                        <span className="me-2"><i className="fa-solid fa-angle-left"></i></span>
                        <span>Go Back</span>
                    </button>
                </div>
                <div className="text-end">
                    <button className="btn text-light small-cancel-note" onClick={() => toggleCancelNote()}>Cancel</button>
                    <button
                        className="btn me-1 ps-1 small-confirm-note"
                        type="submit"
                    >
                        Save Note
                    </button>
                </div>
            </div>

            <hr />

            <div className="container-fluid text-light">
                <h3 className="note-title">{title[0] ? title[0] : 'Note Title'}</h3>

                <div className="row mt-3" style={{ fontSize: '14px' }}>
                    <div className="col-4 col-md-3">
                        <span className="me-2"><i className="fa-solid fa-tag"></i></span>
                        Tags
                    </div>
                    <div className="col me-2">
                        <input 
                            className="ml-background text-light border-0 ps-1 note-input"
                            type="text" 
                            name="tags"
                            value={formData.tags}
                            onChange={handleInputChange}
                            placeholder="(e.g. Work, Planning)"
                            autoComplete="off"
                            style={{ width: '90%' }}
                        />
                    </div>
                </div>
                <div className="row mt-3" style={{ fontSize: '14px' }}>
                    <div className="col-4 col-md-3">
                        <span className="me-2"><i className="fa-solid fa-clock"></i></span>
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
                            height: '95vw',
                            border: 'none',
                            resize: 'none'
                        }}
                    ></textarea>
                </div>
            </div>
        </form>
    );
};

export default AddNote;