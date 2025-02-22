import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { useFolderList } from '../../../context/FolderListContext.jsx';
import { useNoteList } from "../../../context/NoteListContext.jsx";


function FolderList({ folders }) {
    const navigate = useNavigate();

    // Current Folder
    const { currentFolder, setCurrentFolder } = useFolderList();
    const toggleCurrentFolder = (folder) => {
        if (currentFolder && currentFolder._id === folder._id) {
            setCurrentFolder(null);
        }
        else {
            setCurrentFolder(folder);
        }
    };

    // Current Note
    const { currentNote, setCurrentNote } = useNoteList();

    const toggleCurrentNote = (note) => {
        if (currentNote && currentNote._id === note._id) {
            setCurrentNote(null);
            navigate('/');
        }
        else {
            setCurrentNote(note);
            navigate(`/notes/${note._id}`);
        }
    };

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
                            style={{ 
                                backgroundColor: currentFolder && currentFolder._id === folder._id ? '#B2264E' : '#F63366', 
                                textShadow: currentFolder && currentFolder._id === folder._id ? '2px 2px 4px rgba(0, 0, 0, 0.5)' : '',
                                background: currentFolder && currentFolder._id === folder._id ? 'linear-gradient(to bottom, #F63366, #A71A3A)' : '#F63366',
                                boxShadow: currentFolder && currentFolder._id === folder._id ? '3px 3px 10px rgba(0, 0, 0, 0.5)' : 'none',
                                display: 'inline-block',
                                cursor: 'pointer'
                            }}
                            onClick={() => toggleCurrentFolder(folder)}
                        >
                            <span
                                id="arrow-dropdown"
                                style={{ cursor: 'default', display: 'inline-block', width: '1rem' }} 
                                data-bs-toggle="collapse" 
                                data-bs-target={`#collapseExample${folder._id}`}
                                aria-expanded="false" 
                                aria-controls="collapseExample"
                                onClick={(e) => handleFolderDropdown(e, folder._id)}
                            >
                                {openFolders[folder._id] ? 'v' : '>'}
                            </span>
                            {` ${folder.title}`}
                        </h4>
                        <div className="card-body bg-light p-2">
                            <p>{`${folder.description}`}</p>
                            <div class="collapse" id={`collapseExample${folder._id}`}>
                                {!folder.notes.length ? (
                                    <div class="card card-body p-2">
                                        No notes available
                                    </div>
                                ) : (
                                    folder.notes.map(note => (
                                        <div 
                                            class={`'card card-body p-2 mb-2' ${currentNote && currentNote._id === note._id ? 'bg-secondary bg-gradient' : ''}`} key={note._id}
                                            onClick={() => toggleCurrentNote(note)}
                                            style={{ cursor: 'pointer', borderRadius: '10px' }}
                                        >
                                            {note.title}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default FolderList;