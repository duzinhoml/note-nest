import { useActivePage } from '../../context/ActivePageContext.jsx';
import { useNoteList } from '../../context/NoteListContext.jsx';
import { useNotes } from '../../context/NotesContext.jsx';

import SmallNotes from "../../smallComponents/Notes/index.jsx";
import SingleNote from "../../smallComponents/SingleNote/index.jsx";
import Tags from "../../smallComponents/Tags/index.jsx";
import SmallSettings from "../../smallComponents/Settings/index.jsx";

import '../Dashboard/index.css';

function ActivePage({ user, notes, tags }) {
    const { activePage } = useActivePage();
    const { currentNote } = useNoteList();
    const { isCreating } = useNotes();

    return (
        <>
            {currentNote || isCreating ? <SingleNote/> : <SmallNotes notes={notes}/>}
            {activePage === 'tags' && currentNote ? <SingleNote/> : activePage === 'tags' ? <Tags notes={notes} tags={tags}/> : ''}
            {activePage ==='settings' && <SmallSettings user={user}/>}
        </>
    );
};

export default ActivePage;