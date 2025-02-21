import { useState, useContext, createContext } from 'react';

const FolderListContext = createContext();

export const FolderListProvider = ({ children }) => {
    const [currentFolder, setCurrentFolder] = useState(null);

    return (
        <FolderListContext.Provider value={{ currentFolder, setCurrentFolder }}>
            {children}
        </FolderListContext.Provider>
    );
};

export const useFolderList = () => useContext(FolderListContext);