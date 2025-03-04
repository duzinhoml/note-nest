import { useRef, useContext, createContext } from 'react';

const InputRefContext = createContext();

export const InputRefProvider = ({ children }) => {
    const inputTextRef = useRef(null);

    return (
        <InputRefContext.Provider value={{ inputTextRef }}>
            {children}
        </InputRefContext.Provider>
    );
};

export const useInputRef = () => useContext(InputRefContext);