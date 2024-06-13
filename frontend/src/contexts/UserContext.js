//  Code for the UserContext.js file


import React, { createContext, useState, useMemo } from 'react';

// Create the context
export const UserContext = createContext(null);

// Provider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // This state will track the current user

    const value = useMemo(() => ({ user, setUser }), [user]);

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};
