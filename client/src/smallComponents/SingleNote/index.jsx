import { useNoteList } from "../../context/NoteListContext.jsx";

import AddNote from "./AddNote.jsx";
import UpdateNote from "./UpdateNote.jsx";

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