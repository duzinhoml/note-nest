import { useState, useContext, createContext } from 'react';
import { useSearch } from '../Header/context.jsx';

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
    const { searchTerm, setSearchTerm } = useSearch();

    const [noteSelection, setNoteSelection] = useState('all');
    const [tagSelection, setTagSelection] = useState();

    const toggleAllNotes = () => {
        setNoteSelection('all');
    }

    const toggleArchivedNotes = () => {
        setNoteSelection('archived');
    }

    const toggleTagSelection = (tag) => {
        if (tagSelection && tagSelection === tag) {
            setTagSelection(null);
        }
        else {
            setSearchTerm('');
            setTagSelection(tag)
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