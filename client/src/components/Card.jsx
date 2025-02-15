import { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_FOLDERS, QUERY_NOTES } from "../utils/queries";

function Card() {

    const { loading: loadingFolders, error: errorFolders, data: dataFolders } = useQuery(QUERY_FOLDERS)
    const { loading: loadingNotes, error: errorNotes, data: dataNotes } = useQuery(QUERY_NOTES);

    const folders = dataFolders?.folders || [];
    const notes = dataNotes?.notes || [];

    if (errorFolders || errorNotes) return <div>Error: {errorFolders.messsage || errorNotes.message}</div>;

    return (
        <>
            <div className="row">
                {loadingFolders || loadingNotes ? (
                    <div>Loading...</div>
                ): (
                    folders.map(folder => (
                            <div className="col-sm-6 mb-3 mb-sm-0" key={folder._id}>
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">{folder.title}</h5>
                                        <p class="d-inline-flex gap-1">
                                            <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseExample${folder._id}`} aria-expanded="false" aria-controls="collapseExample">
                                                Notes
                                            </button>
                                        </p>
                                        <div class="collapse" id={`collapseExample${folder._id}`}>
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
        </>
    );
};

export default Card;