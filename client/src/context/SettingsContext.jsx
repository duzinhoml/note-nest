import { useState, useContext, createContext } from 'react';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const [settingsSelection, setSettingsSelection] = useState('');

    return (
        <SettingsContext.Provider value={{ settingsSelection, setSettingsSelection}}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => useContext(SettingsContext);