import React, { useState } from 'react'
import UserContext from './UserContext'

const ProtectRoutes = ({ children }) => {
    const [protect, setProtect] = useState(false)

    return (
        <UserContext.Provider value={{ protect, setProtect }}>
            {children}
        </UserContext.Provider>
    )
}

export default ProtectRoutes;
