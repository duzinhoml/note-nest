import { useNavigate } from 'react-router-dom';
import { useSidebar } from '../../context/SidebarContext.jsx';
import { useNoteList } from "../../context/NoteListContext.jsx";

import TaggedNotes from './TaggedNotes.jsx';

function Tags({ notes, tags }) {
    const navigate = useNavigate();
    const { tagSelection, toggleTagSelection } = useSidebar();
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

    const taggedNotes = notes?.filter(note => note.tags.includes(tagSelection));

    return (
        <>
            {!tagSelection ? <div className="mt-3" style={{ paddingBottom: '60px' }}>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item ml-background text-truncate text-white-50 border-bottom-0">
                        <h3 
                            style={{ textOverflow: 'ellipsis', whiteSpace: 'wrap' }}
                        >
                            {!tags || tags.length === 0 ? 
                                <>
                                    No tags available. <br />
                                    Add some tags to organize your notes!
                                </>
                                : 'Tags'}
                        </h3>
                    </li>
                    {tags &&
                        tags.map(tag => (
                            <li key={tag} className={`list-group-item ml-background text-truncate text-light border-bottom-0 rounded sidebar-interact ${tagSelection === tag ? 'sidebar-tags' : ''}`} onClick={() => toggleTagSelection(tag)}>
                                <span className="me-2" style={{ marginLeft: '1px', color: tagSelection === tag ? '#F63366' : '#f8f9fa' }}><i className="fa-solid fa-tag"></i></span>
                                {tag}
                            </li>
                        ))
                    }
                </ul>
            </div>
            :
            <TaggedNotes 
                notes={notes}
                taggedNotes={taggedNotes}
                toggleCurrentNote={toggleCurrentNote} 
            />
        }
        </>
    );
};

export default Tags;