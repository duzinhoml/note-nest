import { useNavigate } from 'react-router-dom';

import { useActivePage } from '../../context/ActivePageContext.jsx';
import { useSidebar } from '../../context/SidebarContext.jsx';
import { useNoteList } from '../../context/NoteListContext';
import { useFormData } from '../../context/FormDataContext';

function TaggedNotes({ notes, taggedNotes, toggleCurrentNote }) {
    const navigate = useNavigate();
    const { activePage, setActivePage } = useActivePage();
    const { tagSelection, setTagSelection } = useSidebar();
    const { currentNote } = useNoteList();
    const { setFormData } = useFormData();
    
    const toggleNote = (note) => {
        setFormData({
            text: '',
            tags: ''
        });
        // setActivePage('tags');
        toggleCurrentNote(note);
    }

    const toggleCancelNote = () => {
        setFormData({
            text: '',
            tags: ''
        });
        
        setTagSelection(null);
        navigate('/');
    }

    return (
        <div 
            className='p-0' 
        >
            <div className="my-3 d-flex align-items-center justify-content-between">
                <div className="ms-1" onClick={() => toggleCancelNote()}>
                    <button className="btn text-light small-cancel-note">
                        <span className="me-2"><i className="fa-solid fa-angle-left"></i></span>
                        <span>Go Back</span>
                    </button>
                </div>
            </div>
            <div className="container-fluid d-flex flex-column">
                <div>
                    <ul className="list-group list-group-flush">
                        {notes && taggedNotes && tagSelection ? (
                            taggedNotes.map(note => (
                                <li key={note._id} className={`list-group-item mt-2 p-2 ${currentNote && currentNote._id === note._id? 'noteList-notes' : 'ml-background noteList-interact'} text-light border-bottom-0`} onClick={() => toggleNote(note)}>
                                    <h5>{note.title}</h5>
                                        {note.tags.map(tag => (
                                            <div key={`${note._id}-${tag}`} className="d-inline-flex flex-wrap mt-2">
                                                <p className={`me-2 p-1 ${currentNote && currentNote._id === note._id ? 'noteList-tags-active' : 'noteList-tags'} rounded`} style={{ fontSize: '12px' }}>{tag}</p>
                                            </div>
                                        ))}
                                    <small className='mt-0 d-block'>{note.createDate}</small>
                                </li>
                            ))) : ''}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TaggedNotes;