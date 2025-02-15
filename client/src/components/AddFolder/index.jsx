import { useState } from "react";
import { useMutation } from "@apollo/client";

import { QUERY_FOLDERS } from "../../utils/queries";
import { CREATE_FOLDER } from "../../utils/mutations";

function AddFolder() {
    const [formData, setFormData] = useState({
        title: '',
        description: ''
    });

    const [createFolder, { error }] = useMutation(CREATE_FOLDER, {
        refetchQueries: [
            QUERY_FOLDERS,
            'allFolders'
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
            await createFolder({
                variables: {
                    input: {
                        ...formData
                    }
                }
            });

            setFormData({
                title: '',
                description: ''
            });

            document.getElementById('closeFolderModalBtn').click();
        } 
        catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            {/* <!-- Button trigger modal --> */}
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#folderModal">
            + Folder
            </button>

            {/* <!-- Modal --> */}
            <div class="modal fade" id="folderModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">Create a New Folder</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" id="closeFolderModalBtn" aria-label="Close"></button>
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
                                        placeholder="Please enter a folder name..." 
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div class="mb-3">
                                    <label for="folderDescriptionInput" class="form-label">Folder Description</label>
                                    <input 
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
                                    <button type="submit" class="btn btn-primary">Create Folder</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddFolder;