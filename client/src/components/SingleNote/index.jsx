import { useNoteList } from "../../context/NoteListContext.jsx";

import AddNote from "../AddNote/index.jsx";
import UpdateNote from "../UpdateNote/index.jsx";

function SingleNote() {
    const { currentNote } = useNoteList();

    return (
        <>
            {currentNote ? (
                <UpdateNote />
            ) : (
                <AddNote/>
            )}
        </>
    );
};

export default SingleNote;