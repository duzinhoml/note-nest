import { useState, useContext, createContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { useSearch } from './SearchContext.jsx';

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
    const navigate = useNavigate();
    const { searchTerm, setSearchTerm } = useSearch();

    const [noteSelection, setNoteSelection] = useState('all');
    const [tagSelection, setTagSelection] = useState(null);

    const toggleAllNotes = () => {
        setNoteSelection('all');
    }

    const toggleArchivedNotes = () => {
        setNoteSelection('archived');
    }

    const toggleTagSelection = (tag) => {
        if (tagSelection && tagSelection === tag) {
            setTagSelection(null);
            navigate('/');
        }
        else {
            setSearchTerm('');
            setTagSelection(tag)
            navigate(`/tag/${tag}`);
        }
    }

    return (
        <SidebarContext.Provider 
            value={{ 
                noteSelection, setNoteSelection, toggleAllNotes, toggleArchivedNotes,
                tagSelection, setTagSelection, toggleTagSelection
            }}
        >
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => useContext(SidebarContext);