import { useState, useEffect, useRef } from "react";

import { useFolderList } from "../../context/FolderListContext.jsx";
import { useNoteList } from "../../context/NoteListContext.jsx";
import { useOffcanvas } from "../../context/OffcanvasContext.jsx";

import FolderList from "../CRUD/FolderList/index.jsx";
import AddNote from "../CRUD/AddNote/index.jsx";
import UpdateNote from "../CRUD/UpdateNote/index.jsx";

function Dashboard({ folders, heading }) {
    // Current Folder
    const { currentFolder } = useFolderList();

    // Current Note
    const { currentNote } = useNoteList();    

    // Offcanvas handling
    const { isOffcanvasOpen, toggleOffcanvas } = useOffcanvas();
    const [offcanvasWidth, setOffcanvasWidth] = useState(window.innerWidth < 768 ? 150 : 250);

    useEffect(() => {
        const handleResize = () => {
            setOffcanvasWidth(window.innerWidth < 768 ? 150 : 250);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    // Textarea Re-size
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
                        <h5 class="offcanvas-title text-light" id="offcanvasScrollingLabel">{heading}</h5>
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

                {currentNote ? (
                    <UpdateNote
                        offcanvasWidth={offcanvasWidth}
                        titleRef={titleRef}
                        textRef={textRef}
                        handleTextAreaInput={handleTextAreaInput}
                        // note={currentNote}
                    />
                ) : (
                    <AddNote
                        offcanvasWidth={offcanvasWidth}
                        titleRef={titleRef}
                        textRef={textRef}
                        handleTextAreaInput={handleTextAreaInput}
                        folder={currentFolder}
                    />
                )}
            </div>
            <button 
                form={!currentNote ? 'addNoteForm' : 'updateNoteForm'}
                type="submit" 
                className="btn btn-primary p-0 position-fixed d-flex justify-content-center align-items-center" 
                style={{ 
                    backgroundColor: '#F63366',
                    borderColor: '#ba0837',
                    fontSize: '2vh',
                    zIndex: 1000,
                    cursor: 'pointer',
                    height: '8vh', 
                    width: '8vh',
                    bottom: '5vh',
                    right: '5vh',
                    borderRadius: '50%',
                    }}
            >
                {!currentNote ? 'Add' : 'Update'}
            </button>
        </div>
    );
};

export default Dashboard;