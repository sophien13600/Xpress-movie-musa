import { createContext, useState, useEffect } from "react";
import axios from "../../axios.config.js";

export const GlobalContext = createContext()

export const Provider = ({ children }) => {
    const [films, setFilms] = useState([]);
    const [searchFilms, setSearchFilms]= useState([])  
    const [adminFilms, setAdminFilms] = useState([])
   

    const [userInfo, setUserInfo] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return (storedUser ? JSON.parse(storedUser) : null)
        
    });

    useEffect(() => {
        if (userInfo) {
            localStorage.setItem("user", JSON.stringify(userInfo));            
        } else {
            localStorage.removeItem("user");
        }
    }, [userInfo]);

    function getFilms() {
        axios.get(`/api/films/${userInfo.id}`)
            .then(response => {
                setAdminFilms(response.data);
            })
            .catch(error => {
                console.error("There was an error!", error);
            });
    }
    useEffect(() => {
        axios.get("/api/films")
            .then(response => {
                setFilms(response.data);
            })
            .catch(error => { console.error("There was an error!", error); });
    }, []);

 
    return (
        <GlobalContext.Provider value={{ userInfo, setUserInfo,films, setFilms, searchFilms, setSearchFilms, adminFilms, setAdminFilms, getFilms }}>
            {children}
        </GlobalContext.Provider>
    )
}
