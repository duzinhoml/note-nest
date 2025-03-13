import { useNavigate } from 'react-router-dom';
import { useActivePage } from '../../context/ActivePageContext';
import { useSettings } from '../../context/SettingsContext';
import { useSidebar } from '../../context/SidebarContext';
import { useNotes } from '../../context/NotesContext';
import { useFormData } from '../../context/FormDataContext';
import { useNoteList } from '../../context/NoteListContext';

import '../Dashboard/index.css';

function Footer() {
    const navigate = useNavigate();
    const { activePage, setActivePage } = useActivePage();
    const { setSettingsSelection } = useSettings();
    const { toggleAllNotes, toggleArchivedNotes, setTagSelection } = useSidebar();
    const { setIsCreating } = useNotes();
    const { setFormData } = useFormData();
    const { setCurrentNote } = useNoteList();

    const handleSelection = (page, notes) => {
        setActivePage(page);

        if (notes === 'all') {
            toggleAllNotes()
        }
        else if (notes === 'archived') {
            toggleArchivedNotes();
        }

        setCurrentNote(null);
        setTagSelection(null);
        setIsCreating(false);
        setFormData({ 
            text: '', 
            tags: '' 
        });
        setSettingsSelection(null);
        navigate(`/`);
    }

    return (
        <>
            <div className="footer">
                <button className={`btn my-1 px-3 ${activePage === 'notes' ? 'active-page-icon' : ''}`} onClick={() => handleSelection('notes', 'all')}>
                    <span style={{ fontSize: '20px', color: activePage === 'notes' ? '#F63366' : '#f8f9fa' }}>
                        <i className="fa-solid fa-house"></i>
                    </span>
                </button>
                <button className={`btn my-1 px-3 ${activePage === 'search' ? 'active-page-icon' : ''}`} onClick={() => handleSelection('search', 'all')}>
                    <span style={{ fontSize: '20px', color: activePage === 'search' ? '#F63366' : '#f8f9fa' }}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </span>
                </button>
                <button className={`btn my-1 px-3 ${activePage === 'archive' ? 'active-page-icon' : ''}`} onClick={() => handleSelection('archive', 'archived')}>
                    <span style={{ fontSize: '20px', color: activePage === 'archive' ? '#F63366' : '#f8f9fa' }}>
                        <i className="fa-solid fa-box-archive"></i>
                    </span>
                </button>
                <button className={`btn my-1 px-3 ${activePage === 'tags' ? 'active-page-icon' : ''}`} onClick={() => handleSelection('tags', 'all')}>
                    <span style={{ fontSize: '20px', color: activePage === 'tags' ? '#F63366' : '#f8f9fa' }}>
                        <i className="fa-solid fa-tag"></i>
                    </span>
                </button>
                <button className={`btn my-1 px-3 ${activePage === 'settings' ? 'active-page-icon' : ''}`} onClick={() => handleSelection('settings', null)}>
                    <span style={{ fontSize: '20px', color: activePage === 'settings' ? '#F63366' : '#f8f9fa' }}>
                        <i className="fa-solid fa-gear"></i>
                    </span>
                </button>
            </div>
        </>
    );
};

export default Footer;