import { useSidebar } from '../../context/SidebarContext.jsx';
import { useSearch } from '../../context/SearchContext.jsx';
import { useFormData } from '../../context/FormDataContext.jsx';
import { useNotes } from '../../context/NotesContext.jsx';
import { useNoteList } from "../../context/NoteListContext.jsx";

import './index.css';

function NoteList({ notes, activeNotes, archivedNotes, activeTaggedNotes, archivedTaggedNotes, toggleCurrentNote }) {
    const { noteSelection, tagSelection } = useSidebar();
    const { searchTerm } = useSearch();
    const { formData, setFormData } = useFormData();
    const { isCreating, setIsCreating } = useNotes();
    const { currentNote } = useNoteList();

    const createNoteTitle = formData.text ? formData.text.split('\n')[0]: 'Untitled Note';

    const toggleNote = (note) => {
        setFormData({
            text: '',
            tags: ''
        });
        setIsCreating(false);
        toggleCurrentNote(note);
    }

    const searchedNotes = notes.filter(note => note.text.toLowerCase().includes(searchTerm.toLowerCase()));

    const searchedTags = notes.filter(note => note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));

    const combinedSearch = [...searchedNotes, ...searchedTags];
    const uniqueSearch = combinedSearch.filter(
        (note, index, self) => 
            index === self.findIndex(n => n._id === note._id)
    );

    return (
        <>
            {isCreating || formData.text.length ? (
                <li className={`list-group-item mt-2 p-2 creating noteList-interact text-light border-bottom-0`} style={{ cursor: 'default' }}>
                    <h5 className='mb-0'>{createNoteTitle}</h5>
                </li>
            ) : ''}
            {
            searchTerm && (searchedNotes || searchedTags) ?
                uniqueSearch.map(note => (
                    <li key={note._id} className={`list-group-item mt-2 p-2 ${currentNote && currentNote._id === note._id? 'noteList-notes' : 'ml-background noteList-interact'} text-light border-bottom-0`} onClick={() => toggleNote(note)}>
                        <h5>{note.title}</h5>
                            {note.tags && note.tags.map(tag => (
                                <div key={`${note._id}-${tag}`} className="d-inline-flex flex-wrap mt-2">
                                    <p className={`me-2 p-1 ${currentNote && currentNote._id === note._id ? 'noteList-tags-active' : 'noteList-tags'} rounded`} style={{ fontSize: '12px' }}>{tag}</p>
                                </div>
                            ))}
                        <small className='mt-0 d-block'>{note.createDate}</small>
                    </li>
                )) : 
                notes && noteSelection === 'all' ? (
                    activeTaggedNotes && tagSelection ? (
                        activeTaggedNotes.map(note => (
                            <li key={note._id} className={`list-group-item mt-2 p-2 ${currentNote && currentNote._id === note._id? 'noteList-notes' : 'ml-background noteList-interact'} text-light border-bottom-0`} onClick={() => toggleNote(note)}>
                                <h5>{note.title}</h5>
                                    {note.tags.map(tag => (
                                        <div key={`${note._id}-${tag}`} className="d-inline-flex flex-wrap mt-2">
                                            <p className={`me-2 p-1 ${currentNote && currentNote._id === note._id ? 'noteList-tags-active' : 'noteList-tags'} rounded`} style={{ fontSize: '12px' }}>{tag}</p>
                                        </div>
                                    ))}
                                <small className='mt-0 d-block'>{note.createDate}</small>
                            </li>
                        ))
                    ) : 
                    activeNotes.map(note => (
                        <li key={note._id} className={`list-group-item mt-2 p-2 ${currentNote && currentNote._id === note._id? 'noteList-notes' : 'ml-background noteList-interact'} text-light border-bottom-0`} onClick={() => toggleNote(note)}>
                            <h5>{note.title}</h5>
                            {note.tags?
                                note.tags.map(tag => (
                                    <div key={`${note._id}-${tag}`} className="d-inline-flex flex-wrap mt-2">
                                        <p className={`me-2 p-1 ${currentNote && currentNote._id === note._id ? 'noteList-tags-active' : 'noteList-tags'} rounded`} style={{ fontSize: '12px' }}>{tag}</p>
                                    </div>
                                )) : ''
                            }
                            <small className='mt-0 d-block'>{note.createDate}</small>
                        </li>
                    ))
                ) : notes && noteSelection === 'archived' ? (
                    archivedTaggedNotes && tagSelection ? (
                        archivedTaggedNotes.map(note => (
                            <li key={note._id} className={`list-group-item mt-2 p-2 ${currentNote && currentNote._id === note._id? 'noteList-notes' : 'ml-background noteList-interact'} text-light border-bottom-0`} onClick={() => toggleNote(note)}>
                                <h5>{note.title}</h5>
                                    {note.tags.map(tag => (
                                        <div key={`${note._id}-${tag}`} className="d-inline-flex flex-wrap mt-2">
                                            <p className={`me-2 p-1 ${currentNote && currentNote._id === note._id ? 'noteList-tags-active' : 'noteList-tags'} rounded`} style={{ fontSize: '12px' }}>{tag}</p>
                                        </div>
                                    ))}
                                <small className='mt-0 d-block'>{note.createDate}</small>
                            </li>
                        ))
                    ) :
                    archivedNotes.map(note => (
                        <li key={note._id} className={`list-group-item mt-2 p-2 ${currentNote && currentNote._id === note._id? 'noteList-notes' : 'ml-background noteList-interact'} text-light border-bottom-0`} onClick={() => toggleNote(note)}>
                            <h5>{note.title}</h5>
                            {note.tags?
                                note.tags.map(tag => (
                                    <div key={`${note._id}-${tag}`} className="d-inline-flex flex-wrap mt-2">
                                        <p className={`me-2 p-1 ${currentNote && currentNote._id === note._id ? 'noteList-tags-active' : 'noteList-tags'} rounded`} style={{ fontSize: '12px' }}>{tag}</p>
                                    </div>
                                )) : ('')
                            }
                            <small className='mt-0 d-block'>{note.createDate}</small>
                        </li>
                    ))
                ) : '' 
            }
        </>
    );
};

export default NoteList;