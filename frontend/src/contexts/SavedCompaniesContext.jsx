import React, { createContext, useContext, useState } from "react";

// Create a context for saved companies
const SavedCompaniesContext = createContext();

// Custom hook to access the saved companies context
export const useSavedCompanies = () => useContext(SavedCompaniesContext);

// Provider component for the saved companies context
export const SavedCompaniesProvider = ({ children }) => {
    // State to manage the list of saved companies
    const [saved, setSaved] = useState([]);

    // Function to add a company to the saved list if it's not already in it
    const addCompany = (company) => {
        setSaved((prev) =>
            prev.find((c) => c.id === company.id) ? prev : [...prev, company]
        );
    };

    // Function to remove a company from the saved list by its ID
    const removeCompany = (id) => {
        setSaved((prev) => prev.filter((c) => c.id !== id));
    };

    // Provide saved companies and functions to modify them
    return (
        <SavedCompaniesContext.Provider value={{ saved, addCompany, removeCompany }}>
            {children}
        </SavedCompaniesContext.Provider>
    );
};
