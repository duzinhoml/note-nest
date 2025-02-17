import { useMutation } from "@apollo/client";

import { QUERY_FOLDERS, QUERY_NOTES } from "../../../utils/queries";
import { DELETE_FOLDER } from "../../../utils/mutations";

function DeleteFolder({ folder }) {
    const { _id, title } = folder;
    const folderId = _id;

    const [deleteFolder, { error }] = useMutation(DELETE_FOLDER, {
        refetchQueries: [
            QUERY_FOLDERS,
            QUERY_NOTES
        ]
    });

    const handleDeleteFolder = async (e) => {
        e.preventDefault();

        try {
            await deleteFolder({
                variables: {
                    folderId
                }
            });

            document.getElementById('closeDeleteFolderModalBtn').click();
        } 
        catch (err) {
            console.error(err.message);
        }
    }


    return (
        <>
            {/* <!-- Modal --> */}
            <div class="modal fade" id="deleteFolderModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">Confirm Delete</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" id="closeDeleteFolderModalBtn" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>
                                Are you sure you want to delete the folder '{title}' and its associated notes?<br /> <br />
                                This action <strong>cannot</strong> be undone.
                            </p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-danger" onClick={handleDeleteFolder}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DeleteFolder;