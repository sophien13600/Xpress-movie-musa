import { createContext, useState } from "react";

export const GlobalContext = createContext()

export const Provider = ({ children }) => {
    const [searchFilms, setSearchFilms]= useState([])
  

    return (
        <GlobalContext.Provider value={{searchFilms,setSearchFilms }}>
            {children}
        </GlobalContext.Provider>
    )
}
