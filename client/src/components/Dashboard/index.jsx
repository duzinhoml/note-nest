import { useState, useEffect, useRef } from "react";
import { useNoteList } from "../CRUD/NoteList/NoteListContext.jsx";
import { useOffcanvas } from "./OffcanvasContext.jsx";

import FolderList from "../CRUD/FolderList/index.jsx";
import AddNote from "../CRUD/AddNote/index.jsx";

function Dashboard({ folders, title }) {

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

    const textareaRef = useRef(null);

    const handleTextAreaInput = () => {
        const textarea = textareaRef.current;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    };

    const titleRows = currentNote && currentNote.title.length > 31 ? 3 : 1;
    const textRows = currentNote && currentNote.text ? Math.max(3, Math.floor(currentNote.text.length / 30)) : 3;

    return (
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

            <div 
                id="main-content" 
                className="flex-grow-1 p-3 text-light" 
                style={{ marginLeft: isOffcanvasOpen ? `${offcanvasWidth}px` : "0", transition: "margin-left 0.3s ease-in-out" }}
            >
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label" style={{ fontSize: '20px'}}>Note Title</label>
                    <textarea 
                        ref={textareaRef}
                        class="form-control bg-secondary" 
                        id="exampleFormControlTextarea1"
                        value={currentNote ? currentNote.title : ''}
                        rows={titleRows}
                        placeholder="Please provide a title for the note..."
                        onInput={handleTextAreaInput}
                        style={{ fontSize: isOffcanvasOpen && offcanvasWidth === 150 ? '0.865rem' : '16px', overflow: 'hidden' }}
                    ></textarea>
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label" style={{ fontSize: '20px'}}>Note Content</label>
                    <textarea 
                        ref={textareaRef}
                        class="form-control bg-secondary" 
                        id="exampleFormControlTextarea2" 
                        value={currentNote ? currentNote.text : ''}
                        rows={textRows} 
                        placeholder="Please enter the content of the note..."
                        onInput={handleTextAreaInput}
                        style={{ fontSize: isOffcanvasOpen && offcanvasWidth === 150 ? '0.865rem' : '16px', overflow: 'hidden' }}
                    ></textarea>
                </div>
            </div>
            <AddNote/>
        </div>
    );
};

export default Dashboard;