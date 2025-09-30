import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useRef } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import axios from "../../../axios.config";

export default function Header() {
    const { isAuthenticated, setIsAuthenticated } = useContext(GlobalContext)

    const { userInfo, setUserInfo,searchFilms, setSearchFilms } = useContext(GlobalContext)
    console.log(userInfo);
    
    
    const navigate = useNavigate()
 
    
    const url = userInfo == null ? '/signup' : '/dashboard'

    const search = useRef();
    
    function logout() {
        localStorage.removeItem('user')
        setUserInfo(null);
        // setIsAuthenticated(false)
        navigate('/login')
    }


async function searchFilm(e) {
    e.preventDefault();
    const query = search.current?.value?.trim();
    if (!query) return;
    
    try {
        const res = await axios.post('/api/films/search', { search: query });
        setSearchFilms(res.data);
        navigate('/search');
    } catch (err) {
        console.error(err);
    }
}



    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container-fluid">
                <NavLink to="/" className="navbar-brand ms-3">Xpress-Movie</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to="/" className="nav-link active" aria-current="page">Accueil</NavLink>

                        </li>
                        <li className="nav-item">
                            <NavLink to="/favori" className="nav-link">Favoris</NavLink>
                        </li>
                    </ul>

                    <form className="d-flex mx-auto my-2 my-lg-0" onSubmit={searchFilm}>

                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" ref={search} />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>

                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                        <li className="nav-item d-flex align-items-center me-3">
                            <NavLink to={url} className="nav-link">Compte</NavLink>
                        </li>
                        {!userInfo &&
                            <li className="nav-item d-flex align-items-center me-3">
                                <NavLink to="/login" className="nav-link">Connexion</NavLink>
                            </li>

                        }
                        {userInfo &&
                            <li className="nav-item d-flex align-items-center me-3">
                                <span className="nav-link"> {userInfo.nom} </span>
                                <button className="nav-link btn btn-link" onClick={logout}> Deconnexion </button>
                            </li>
                        }
                    </ul>

                </div>
            </div>
        </nav >
    )
}