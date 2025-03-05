import { useSearch } from '../../context/SearchContext.jsx';
import { useSidebar } from '../../context/SidebarContext.jsx';

import '../Dashboard/index.css';
// import './index.css';

function Sidebar({ tags }) {
    const { searchTerm } = useSearch();
    const { noteSelection, tagSelection, setTagSelection, toggleAllNotes, toggleArchivedNotes, toggleTagSelection } = useSidebar();

    if (searchTerm) {
        setTagSelection(null);
    }

    return (
        // Removed 'col-2'
        <div 
            className="text-light ml-background m-3 mt-3 p-0 settings-sidebar" 
            style={{ 
                // border: '2px solid rgba(0, 255, 4, 0.1)',
            }}
        >
            <div className="pb-3 ms-2">
                <h3>
                    <span className="me-2"><i class="fa-solid fa-pencil"></i></span>
                    NoteNest
                </h3>
            </div>
            
            <div>
                <ul className="list-group list-group-flush">
                    <li className={`list-group-item ml-background ${noteSelection === 'all' ? 'd-flex justify-content-between sidebar-notes' : ''} text-light border-bottom-0 rounded sidebar-interact`} onClick={() => toggleAllNotes()}>
                        <div>
                            <span className="me-2"><i class="fa-solid fa-house" style={{ color: noteSelection === 'all' ? '#F63366' : '#f8f9fa' }}></i></span>
                            All Notes
                        </div>
                        {noteSelection === 'all' ? (<span><i class="fa-solid fa-chevron-right" style={{ color: '#F63366' }}></i></span>) : ''}
                    </li>
                    <li className={`list-group-item ml-background ${noteSelection === 'archived' ? 'd-flex justify-content-between sidebar-notes' : ''} text-light rounded sidebar-interact`} onClick={() => toggleArchivedNotes()}>
                        <div>
                            <span className="me-2" style={{ marginLeft: '1px', color: noteSelection === 'archived' ? '#F63366' : '#f8f9fa' }}><i class="fa-solid fa-box-archive"></i></span>
                            Archived Notes
                        </div>
                        {noteSelection === 'archived' ? (<span><i class="fa-solid fa-chevron-right" style={{ color: '#F63366' }}></i></span>) : ''}
                    </li>
                </ul>
            </div>

            <hr />

            <div className="mt-3">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item ml-background text-truncate text-white-50 border-bottom-0">
                        Tags
                    </li>
                    {tags &&
                        tags.map(tag => (
                            <li key={tag} className={`list-group-item ml-background text-truncate text-light border-bottom-0 rounded sidebar-interact ${tagSelection === tag ? 'sidebar-tags' : ''}`} onClick={() => toggleTagSelection(tag)}>
                                <span className="me-2" style={{ marginLeft: '1px', color: tagSelection === tag ? '#F63366' : '#f8f9fa' }}><i class="fa-solid fa-tag"></i></span>
                                {tag}
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;