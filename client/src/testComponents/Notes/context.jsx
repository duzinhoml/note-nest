import { useState, useContext, createContext } from 'react';

const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
    const [isCreating, setIsCreating] = useState(false);

    return (
        <NotesContext.Provider value={{ isCreating, setIsCreating }}>
            {children}
        </NotesContext.Provider>
    );
};

export const useNotes = () => useContext(NotesContext);