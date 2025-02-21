import { useState, useEffect, useRef } from "react";
import { useFolderList } from "../CRUD/FolderList/FolderListContext.jsx";
import { useNoteList } from "../CRUD/NoteList/NoteListContext.jsx";
import { useOffcanvas } from "./OffcanvasContext.jsx";
import { useMutation } from "@apollo/client";

import { QUERY_ME } from "../../utils/queries.js";
import { CREATE_NOTE } from "../../utils/mutations.js";

import FolderList from "../CRUD/FolderList/index.jsx";
// import AddNote from "../CRUD/AddNote/index.jsx";

function Dashboard({ folders, title }) {
    const { currentFolder } = useFolderList();
    let folderId = null;
    if (currentFolder) {
        const { _id } = currentFolder;
        folderId = _id;
    }

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
            if (currentFolder && folderId) {
                await createNote({
                    variables: {
                        folderId,
                        input: {
                            ...formData
                        }
                    }
                })
            }
            else {
                await createNote({
                    variables: {
                        input: {
                            ...formData
                        }
                    }
                });
            };

          setFormData({
            title: '',
            text: ''
          });
        } 
        catch (err) {
            console.error(err);
        }
    }

    const { currentNote } = useNoteList();

    const { isOffcanvasOpen, toggleOffcanvas } = useOffcanvas();
    const [offcanvasWidth, setOffcanvasWidth] = useState(window.innerWidth < 768 ? 150 : 250);

    useEffect(() => {
        const handleResize = () => {
            setOffcanvasWidth(window.innerWidth < 768 ? 150 : 250);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    const titleRef = useRef(null);
    const textRef = useRef(null);

    const handleTextAreaInput = (ref) => {
        const textarea = ref.current;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    };

    return (
        <div className="position-relative min-vh-100">
            <div className="d-flex flex-column flex-md-row">
                <div 
                    class={`offcanvas offcanvas-start ${isOffcanvasOpen ? 'show': ''}`} 
                    data-bs-scroll="true" 
                    data-bs-backdrop="false" 
                    tabindex="-1" 
                    id="offcanvasNotes" 
                    aria-labelledby="offcanvasScrollingLabel" 
                    style={{ width: isOffcanvasOpen ? `${offcanvasWidth}px` : "0", transition: "width 0.3s ease-in-out" }}
                >
                    <div class="offcanvas-header ml-background" style={{ paddingBottom: '11px' }}>
                        <h5 class="offcanvas-title text-light" id="offcanvasScrollingLabel">{title}</h5>
                        <button 
                            type="button" 
                            class="btn-close" 
                            data-bs-dismiss="offcanvas" 
                            aria-label="Close" 
                            onClick={toggleOffcanvas}
                        ></button>
                    </div>
                    <div class="offcanvas-body bg-secondary">
                        <FolderList
                            folders={folders}
                        />
                    </div>
                </div>

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
                                class="form-control bg-secondary" 
                                id="exampleFormControlTextarea1"
                                name='title'
                                value={currentNote ? currentNote.title : formData.title}
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
                                class="form-control bg-secondary" 
                                id="exampleFormControlTextarea2" 
                                name='text'
                                value={currentNote ? currentNote.text : formData.text}
                                rows={3} 
                                placeholder="Please enter the content of the note..."
                                onChange={handleInputChange}
                                onInput={() => handleTextAreaInput(textRef)}
                                style={{ fontSize: isOffcanvasOpen && offcanvasWidth === 150 ? '0.865rem' : '16px', overflow: 'hidden' }}
                            ></textarea>
                        </div>
                    </div>
                    {/* <AddNote/> */}
                </form>
            </div>
            <button 
                form="addNoteForm"
                type="submit" 
                className="btn btn-primary p-0 position-fixed d-flex justify-content-center align-items-center" 
                style={{ 
                    backgroundColor: '#F63366',
                    borderColor: '#ba0837',
                    fontSize: '3vh',
                    zIndex: 1000,
                    cursor: 'pointer',
                    height: '8vh', 
                    width: '8vh',
                    bottom: '5vh',
                    right: '5vh',
                    borderRadius: '50%',
                    }}
            >
                Add
            </button>
        </div>
    );
};

export default Dashboard;