import { createContext, useState } from "react";

export const GlobalContext = createContext()

const message = 'Hello, world!'

export const Provider = ({ children }) => {
  

    return (
        <GlobalContext.Provider value={{ }}>
            {children}
        </GlobalContext.Provider>
    )
}