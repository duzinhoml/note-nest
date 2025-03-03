import { useSidebar } from '../Sidebar/context.jsx';
import { useNoteList } from "../../context/NoteListContext.jsx";

import './index.css';

function NoteList({ notes, activeNotes, archivedNotes, activeTaggedNotes, archivedTaggedNotes, toggleCurrentNote }) {
    const { noteSelection, tagSelection } = useSidebar();
    const { currentNote } = useNoteList();

    return (
        <>
            {notes && noteSelection === 'all' ? (
                activeTaggedNotes && tagSelection ? (
                    activeTaggedNotes.map(note => (
                        <li key={note._id} className={`list-group-item mt-2 p-2 ${currentNote && currentNote._id === note._id? 'noteList-notes' : 'ml-background noteList-interact'} text-light border-bottom-0`} onClick={() => toggleCurrentNote(note)}>
                            <h5>{note.title}</h5>
                                {note.tags.map(tag => (
                                    <div className="d-inline-flex flex-wrap mt-2">
                                        <p className={`me-2 p-1 ${currentNote && currentNote._id === note._id ? 'noteList-tags-active' : 'noteList-tags'} rounded`} style={{ fontSize: '12px' }}>{tag}</p>
                                    </div>
                                ))}
                            <small className='mt-0 d-block'>{note.createDate}</small>
                        </li>
                    ))
                ) : 
                activeNotes.map(note => (
                    <li key={note._id} className={`list-group-item mt-2 p-2 ${currentNote && currentNote._id === note._id? 'noteList-notes' : 'ml-background noteList-interact'} text-light border-bottom-0`} onClick={() => toggleCurrentNote(note)}>
                        <h5>{note.title}</h5>
                        {note.tags?
                            note.tags.map(tag => (
                                <div className="d-inline-flex flex-wrap mt-2">
                                    <p className={`me-2 p-1 ${currentNote && currentNote._id === note._id ? 'noteList-tags-active' : 'noteList-tags'} rounded`} style={{ fontSize: '12px' }}>{tag}</p>
                                </div>
                            )) : ''
                        }
                        <small className='mt-0 mb-2 d-block'>{note.createDate}</small>
                    </li>
                ))
            ) : notes && noteSelection === 'archived' ? (
                archivedTaggedNotes && tagSelection ? (
                    archivedTaggedNotes.map(note => (
                        <li key={note._id} className={`list-group-item mt-2 p-2 ${currentNote && currentNote._id === note._id? 'noteList-notes' : 'ml-background noteList-interact'} text-light border-bottom-0`} onClick={() => toggleCurrentNote(note)}>
                            <h5>{note.title}</h5>
                                {note.tags.map(tag => (
                                    <div className="d-inline-flex flex-wrap mt-2">
                                        <p className={`me-2 p-1 ${currentNote && currentNote._id === note._id ? 'noteList-tags-active' : 'noteList-tags'} rounded`} style={{ fontSize: '12px' }}>{tag}</p>
                                    </div>
                                ))}
                            <small className='mt-0 d-block'>{note.createDate}</small>
                        </li>
                    ))
                ) :
                archivedNotes.map(note => (
                    <li key={note._id} className={`list-group-item mt-2 p-2 ${currentNote && currentNote._id === note._id? 'noteList-notes' : 'ml-background noteList-interact'} text-light border-bottom-0`} onClick={() => toggleCurrentNote(note)}>
                        <h5>{note.title}</h5>
                        {note.tags?
                            note.tags.map(tag => (
                                <div className="d-inline-flex flex-wrap mt-2">
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