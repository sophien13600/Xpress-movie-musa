import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";


export default function Header() {
    const { isAuthenticated, setIsAuthenticated } = useContext(GlobalContext)
    function logout() {
        localStorage.removeItem('username')
        localStorage.removeItem('password')
        setIsAuthenticated(false)

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

                    <form className="d-flex mx-auto my-2 my-lg-0" role="search" action="/search" method="post">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" name="search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>


                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                        <li className="nav-item d-flex align-items-center me-3">
                            <NavLink to="/signup" className="nav-link">Compte</NavLink>
                        </li>
                        {!isAuthenticated &&
                            <li className="nav-item d-flex align-items-center me-3">
                                <NavLink to="/login" className="nav-link">Connexion</NavLink>
                            </li>
                        }
                        {isAuthenticated &&
                            <li className="nav-item d-flex align-items-center me-3">
                                <span className="nav-link">user.nom </span>
                                <a className="nav-link" href="/login">Deconnexion</a>
                            </li>
                        }
                    </ul>

                </div>
            </div>
        </nav >
    )
}