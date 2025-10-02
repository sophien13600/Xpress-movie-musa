import axios from "../../axios.config.js"
import { useRef, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { GlobalContext } from "../contexts/GlobalContext.jsx";
import './AdminFilms.jsx'

export default function SaveFilm() {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    const { getFilms, adminFilms, setAdminFilms, userInfo, setUserInfo } = useContext(GlobalContext);
    

    const genre = useRef()
    const titre = useRef()
    const description = useRef()
    const date = useRef()
    const image = useRef()


    const navigate = useNavigate();

    const saveFilm = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post('/api/films', {
                genre: genre.current?.value?.trim(),
                titre: titre.current?.value?.trim(),
                description: description.current?.value?.trim(),
                date: date.current?.value,
                image: image.current?.value,
                userId: userInfo.id
            })
      
            setAdminFilms(res.data.film);
            localStorage.setItem('film', JSON.stringify(adminFilms));
            getFilms();
          
        } catch (error) {
            console.error(error);
            alert("The movie could not be recorded !");
            navigate('/dashboard')
        }
    }



    return (
        <div className="container p-4 w-100 mt-5 border rounded bg-dark p-4 text-light justify-content-center align-items-center">
            <h3> Enregister un film</h3>

            <form className="d-flex gap-1 row g-3 " onSubmit={saveFilm}>
                <div className="m-3 col-12 col-sm-6 col-md-3 ">
                    <label htmlFor="genre" className="form-label">Genre</label>
                    <input type="text" className="form-control" ref={genre} />
                </div>
                <div className="m-3 col-12 col-sm-6 col-md-3 ">
                    <label htmlFor="titre" className="form-label">Titre</label>
                    <input type="text" className="form-control" ref={titre} />
                </div>
                <div className="m-3 col-12 col-sm-6 col-md-3 ">
                    <label htmlFor="description" className="form-label">Description </label>
                    <input type="text" className="form-control" id="description_id" ref={description} />
                </div>
                <div className="m-3 col-12 col-sm-6 col-md-3 ">
                    <label htmlFor="date" className="form-label">Date de Sortie</label>
                    <input type="date" className="form-control" ref={date} />
                </div>
                <div className="m-3 col-12 col-sm-6 col-md-3 ">
                    <label htmlFor="image" className="form-label">Image</label>
                    <input type="file" className="form-control" ref={image} />
                </div>
                <div className="m-3 mt-5 col-12 col-sm-6 col-md-3">
                    <button type="submit" className="btn btn-primary w-100">Enregistrer</button>
                </div>
            </form>
        </div>
    )
}
