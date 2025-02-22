import { useState, useContext, createContext } from "react";

const OffcanvasContext = createContext();

export const OffcanvasProvider = ({ children }) => {
    const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);

    const toggleOffcanvas = () => {
        setIsOffcanvasOpen(prev => !prev);
    };

    return (
        <OffcanvasContext.Provider value={{ isOffcanvasOpen, setIsOffcanvasOpen, toggleOffcanvas }}>
            {children}
        </OffcanvasContext.Provider>
    );
};

export const useOffcanvas = () => useContext(OffcanvasContext);