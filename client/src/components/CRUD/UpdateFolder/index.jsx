import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";

import { QUERY_FOLDERS, QUERY_NOTES } from "../../../utils/queries";
import { UPDATE_FOLDER } from "../../../utils/mutations";

function UpdateFolder({ folder }) {
    const { _id, title, description } = folder || {};
    const folderId = _id 

    const [formData, setFormData] = useState({
        title: '',
        description: ''
    });

    useEffect(() => {
        if (folder) {
            setFormData({
                title,
                description
            })
        }
    }, [folder]);

    const [updateFolder, { error }] = useMutation(UPDATE_FOLDER, {
        refetchQueries: [
            QUERY_FOLDERS,
            QUERY_NOTES
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
            await updateFolder({
                variables: {
                    folderId,
                    input: {
                        ...formData
                    }
                }
            });

            setFormData({
                title: '',
                description: ''
            });

            document.getElementById('closeUpdateFolderModalBtn').click();
        } 
        catch (err) {
            console.error(err)
        }
    }



    return (
        <>
            <div class="modal fade" id="updateFolderModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">Update Folder</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" id="closeUpdateFolderModalBtn" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form onSubmit={handleFormSubmit}>
                                <div class="mb-3">
                                    <label for="folderTitleInput" class="form-label">Folder Name</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="folderTitleInput" 
                                        name="title"
                                        placeholder="Enter the folder name..." 
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div class="mb-3">
                                    <label for="folderDescriptionInput" class="form-label">Folder Description</label>
                                    <textarea 
                                        type="text" 
                                        className="form-control" 
                                        id="folderDescriptionInput" 
                                        name="description"
                                        placeholder="Provide a brief description of this folder..."
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                    <button type="submit" class="btn btn-primary">Update Folder</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpdateFolder;