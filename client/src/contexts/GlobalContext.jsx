import { createContext, useState } from "react";
import axios from "../../axios.config.js";

export const GlobalContext = createContext()

export const Provider = ({ children }) => {
    const [searchFilms, setSearchFilms]= useState([])  
    const [adminFilms, setAdminFilms] = useState([])

    const storedUser = localStorage.getItem('user');
    const userInfo = storedUser ? JSON.parse(storedUser) : null;

    function getFilms() {
        axios.get(`/api/films/${userInfo.id}`)
            .then(response => {
                setAdminFilms(response.data);
            })
            .catch(error => {
                console.error("There was an error!", error);
            });
    }

    return (
        <GlobalContext.Provider value={{ searchFilms, setSearchFilms, adminFilms, setAdminFilms, getFilms }}>
            {children}
        </GlobalContext.Provider>
    )
}
