import { useState, useContext, createContext } from 'react';

const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
    const [activeNotes, setActiveNotes] = useState

    return (
        <NotesContext.Provider value={{ }}>
            {children}
        </NotesContext.Provider>
    );
}