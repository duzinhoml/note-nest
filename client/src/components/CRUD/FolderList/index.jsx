import { useState } from 'react'
import { useNoteList } from "../NoteList/NoteListContext.jsx";

// import AddNote from "../AddNote/index.jsx";

function FolderList({ folders }) {
    const { currentNote, setCurrentNote } = useNoteList();
    console.log(currentNote);

    const [currentFolder, setCurrentFolder] = useState(null);
    const [openFolders, setOpenFolders] = useState({})

    const handleFolderDropdown = (e, folderId) => {
        e.stopPropagation();

        setOpenFolders(prev => ({
            ...prev,
            [folderId]: !prev[folderId]
        }));
    }

    return (
        <div>
            {folders &&
                folders.map(folder => (
                    <div key={folder._id} className="card mb-3">
                        <h4 
                            className="card-header text-light p-2 m-0" 
                            style={{ backgroundColor: '#F63366', display: 'inline-block' }}
                            onClick={() => setCurrentFolder(folder)}
                        >
                            <span 
                                id="arrow-dropdown"
                                style={{ cursor: 'pointer', display: 'inline-block', width: '1rem' }} 
                                data-bs-toggle="collapse" 
                                data-bs-target={`#collapseExample${folder._id}`}
                                aria-expanded="false" 
                                aria-controls="collapseExample"
                                onClick={(e) => handleFolderDropdown(e, folder._id)}
                            >{openFolders[folder._id] ? 'v' : '>'}</span>
                            {` ${folder.title}`} <br />
                        </h4>
                        <div className="card-body bg-light p-2">
                            <p>{`${folder.description}`}</p>
                            {!folder.notes.length ? (
                                <div class="collapse" id={`collapseExample${folder._id}`}>
                                    <div class="card card-body p-1">
                                        No notes available
                                    </div>
                                </div>
                            ) : (
                                folder.notes.map(note => (
                                    <div key={note._id} class="collapse" id={`collapseExample${folder._id}`}>
                                        <div class={`'card card-body p-1 mb-2' ${currentNote && currentNote._id === note._id ? 'bg-secondary bg-gradient' : ''}`} onClick={() => setCurrentNote(note)} style={{ cursor: 'pointer' }}>
                                            {!note ? 'No notes yet' : note.title}
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                ))}
                {/* <AddNote folder={currentFolder}/> */}
        </div>
    );
};

export default FolderList;