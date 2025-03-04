import { useState, useContext, createContext } from "react";

const FormDataContext = createContext();

export const FormDataProvider = ({ children }) => {
    const [formData, setFormData] = useState({
        text: '',
        tags: ''
    });

    return (
        <FormDataContext.Provider value={{ formData, setFormData }}>
            {children}
        </FormDataContext.Provider>
    );
};

export const useFormData = () => useContext(FormDataContext);