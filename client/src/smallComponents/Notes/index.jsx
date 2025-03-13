import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useActivePage } from '../../context/ActivePageContext.jsx';
import { useSearch } from '../../context/SearchContext.jsx';
import { useSidebar } from '../../context/SidebarContext.jsx';
import { useInputRef } from '../../context/InputRefContext.jsx';
import { useNotes } from '../../context/NotesContext.jsx';
import { useNoteList } from "../../context/NoteListContext.jsx";

import NoteList from './NoteList.jsx';

// import '../Dashboard/index.css';
// import './index.css';

function SmallNotes({ notes }) {
    const navigate = useNavigate();

    const { activePage } = useActivePage();
    const { searchTerm, setSearchTerm } = useSearch();
    const { tagSelection } = useSidebar();
    const { setIsCreating } = useNotes();
    const { currentNote, setCurrentNote } = useNoteList();

    const toggleCurrentNote = (note) => {
        if (currentNote && currentNote._id === note._id) {
            setCurrentNote(null);
            navigate('/');
        }
        else {
            setCurrentNote(note);
            navigate(`/note/${note._id}`);
        }
    };

    const archivedNotes = notes?.filter(note => note.isArchived === true);
    const activeNotes = notes?.filter(note => note.isArchived === false);

    const archivedTaggedNotes = archivedNotes?.filter(note => note.tags.includes(tagSelection));
    const activeTaggedNotes = activeNotes?.filter(note => note.tags.includes(tagSelection));

    const handleInputChange = (e) => {
        const { value } = e.target;
        setSearchTerm(value);
    }

    const clearSearch = () => {
        if (searchTerm) {
            setSearchTerm('');
        }
    }

    return (
        <>
            {activePage === 'notes' || activePage === 'search' || activePage === 'archive' ? 
            <div 
                className='pt-4'
                style={{ paddingBottom: '60px' }} 
            >
                <div className="container-fluid d-flex flex-column">
                    {activePage === 'tags' ? '' :
                    activePage === 'search' ? 
                        <form className="d-flex search" role="search" style={{ marginBottom: '10px' }}>
                            <span className="input-group-text rounded-end-0" id="search-input" style={{ cursor: searchTerm ? 'pointer' : 'default' }} onClick={() => clearSearch()}>
                                {searchTerm ? <i className="fa-solid fa-xmark"></i> : <i className="fa-solid fa-magnifying-glass"></i>}
                            </span>
                            <input 
                                className="form-control p-2 w-100 rounded-start-0 header-input" 
                                type="text"
                                name="search"
                                value={searchTerm}
                                placeholder="Search by title, content, or tags..." 
                                autoComplete='off'
                                onChange={handleInputChange}
                                aria-label="Search" 
                                aria-describedby="search-input"
                            />
                        </form> 
                        : 
                    <button 
                        className="btn text-light mb-2 p-2 create-note"
                        onClick={() => setIsCreating(true)}
                    >
                        + Create New Note
                    </button>}

                    <h3 
                        className='text-white-50 mt-1'
                        style={{ textOverflow: 'ellipsis', whiteSpace: 'wrap' }}
                    >
                        {!notes || notes.length === 0 ? 
                            <>
                                No notes available. <br />
                                Start nesting your thoughts today!
                            </>
                            : ''}
                    </h3>
                    <p className='text-white-50'>{searchTerm && notes ? `All notes matching "${searchTerm}" are displayed below.` : ''}</p>

                    <div>
                        <ul className="list-group list-group-flush">
                            <NoteList 
                                notes={notes} 
                                activeNotes={activeNotes}
                                archivedNotes={archivedNotes}
                                activeTaggedNotes={activeTaggedNotes} 
                                archivedTaggedNotes={archivedTaggedNotes} 
                                toggleCurrentNote={toggleCurrentNote} 
                            />
                        </ul>
                    </div>
                </div>
            </div> : ''}
        </>
    );
};

export default SmallNotes;