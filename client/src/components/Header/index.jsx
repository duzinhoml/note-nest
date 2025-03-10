import { useNavigate } from 'react-router-dom'
import { useSearch } from '../../context/SearchContext.jsx';
import { useSidebar } from '../../context/SidebarContext.jsx';
import { useNoteList } from '../../context/NoteListContext.jsx';

import '../Dashboard/index.css';
import './index.css';

function Header({ heading, initials }) {
    const navigate = useNavigate();
    const { searchTerm, setSearchTerm } = useSearch();
    const { setTagSelection } = useSidebar();
    const { setCurrentNote } = useNoteList();

    const handleInputChange = (e) => {
        const { value } = e.target;
        setSearchTerm(value);
    }

    const clearSearch = () => {
        if (searchTerm) {
            setSearchTerm('');
        }
    }

    const toSettings = () => {
        setCurrentNote(null);
        setTagSelection(null);
        navigate('/settings');
    }

    return (
        // Removed 'col-12'
        <div 
            className="text-light ml-background m-0 my-2 me-4 p-0 header" 
            // style={{ border: '2px solid rgba(0, 255, 4, 0.1)' }}
        >
            <nav class="navbar ml-background w-100">
                <div class="header-container">
                    <h3 className="text-light header-title">{heading}</h3>
                    <form class="d-flex flex-grow-1 search" style={{ maxWidth: '330px' }} role="search">
                        <span className="input-group-text rounded-end-0" id="search-input" style={{ cursor: searchTerm ? 'pointer' : 'default' }} onClick={() => clearSearch()}>
                            {searchTerm ? <i class="fa-solid fa-xmark"></i> : <i class="fa-solid fa-magnifying-glass"></i>}
                        </span>
                        <input 
                            class="form-control me-2 rounded-start-0 header-input" 
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
                    <div className='profile' style={{ fontSize: '18px' }} onClick={() => toSettings()}>{initials}</div>
                </div>
            </nav>
        </div>
    );
};

export default Header;