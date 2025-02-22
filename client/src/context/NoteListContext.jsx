import { useState, useContext, createContext } from 'react';

const NoteListContext = createContext();

export const NoteListProvider = ({ children }) => {
    const [currentNote, setCurrentNote] = useState(null);

    return (
        <NoteListContext.Provider value={{ currentNote, setCurrentNote }}>
            {children}
        </NoteListContext.Provider>
    );
};

export const useNoteList = () => useContext(NoteListContext);