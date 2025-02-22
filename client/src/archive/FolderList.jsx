import AddNote from '../components/CRUD/AddNote/index.jsx';
import UpdateFolder from '../components/CRUD/UpdateNote/index.jsx';
import DeleteFolder from '../components/CRUD/DeleteFolder/index.jsx';

import { useState } from 'react';
import { useQuery } from "@apollo/client";
import { QUERY_FOLDERS } from "../utils/queries.js";

function FolderList() {
    const [currentFolder, setCurrentFolder] = useState(null);

    const { loading: loadingFolders, error: errorFolders, data: dataFolders } = useQuery(QUERY_FOLDERS)
    const folders = dataFolders?.folders || [];

    if (errorFolders) return <div>Error: {errorFolders.message}</div>;

    return (
        <>
            <div className="row">
                {loadingFolders ? (
                    <div>Loading...</div>
                ): (
                    folders.map(folder => (
                            <div className="col-12 col-md-6 col-lg-4 mb-3" key={folder._id}>
                                <div class="card h-100">
                                    <div class="card-body">
                                        <h5 class="card-title">{folder.title}</h5>
                                        <p>{folder.description}</p>
                                        {/* <p class="d-inline-flex gap-1"> */}
                                        <div className='d-flex flex-wrap gap-2 mt-auto'>
                                            <button 
                                                class="btn btn-primary" 
                                                type="button" 
                                                data-bs-toggle="collapse" 
                                                data-bs-target={`#collapseExample${folder._id}`} 
                                                aria-expanded="false" 
                                                aria-controls="collapseExample"
                                            >
                                                Notes
                                            </button>
                                            {/* <!-- Add Note Button trigger modal --> */}
                                            <button 
                                                type="button" 
                                                class="btn btn-success" 
                                                data-bs-toggle="modal" 
                                                data-bs-target="#addNoteModal" 
                                                onClick={() => setCurrentFolder(folder)}
                                            >
                                                + Note
                                            </button>
                                            {/* <!-- Update Button trigger modal --> */}
                                            <button 
                                                type="button" 
                                                class="btn btn-warning" 
                                                data-bs-toggle="modal" 
                                                data-bs-target="#updateFolderModal"
                                                onClick={() => setCurrentFolder(folder)}
                                            >
                                                Update Folder
                                            </button>
                                            {/* <!-- Delete Button trigger modal --> */}
                                            <button 
                                                type="button" 
                                                class="btn btn-danger" 
                                                data-bs-toggle="modal" 
                                                data-bs-target="#deleteFolderModal"
                                                onClick={() => setCurrentFolder(folder)}
                                            >
                                                Delete Folder
                                            </button>
                                        {/* </p> */}
                                        </div>
                                        <div class="collapse mt-2" id={`collapseExample${folder._id}`}>
                                            {folder.notes.length > 0 ? (
                                                folder.notes.map(note => (
                                                    <div class="card card-body" key={note._id}>
                                                        {note.title}
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="card card-body">No notes available</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                    ))
                )}
            </div>
            {currentFolder && <AddNote folder={currentFolder}/>}
            {currentFolder && <UpdateFolder folder={currentFolder}/>}
            {currentFolder && <DeleteFolder folder={currentFolder}/>}
        </>
    );
};

export default FolderList;