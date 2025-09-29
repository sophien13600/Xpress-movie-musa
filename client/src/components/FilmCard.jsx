import { useEffect, useRef, useState } from "react";
import axios from "../../axios.config.js";
import { useNavigate } from "react-router-dom"


export default function FilmCard() {
    const [films, setFilms] = useState([]);
    const [erreur, setErreur] = useState()
    const navigate = useNavigate();

    const storedUser = localStorage.getItem('user');
    const userInfo = storedUser ? JSON.parse(storedUser) : null;

    useEffect(() => {
        axios.get("/api/films")
            .then(response => {
                setFilms(response.data);
            })
            .catch(error => { console.error("There was an error!", error); });
    }, []);

    async function addFavori(filmId) {   
        if (!userInfo) {
            alert('Please login to add a movie to your favorites.')
            navigate('/login')
        } else {
            const res = await axios.post('/api/favoris', {
                userId: userInfo.id,
                filmId: filmId
            })
            const favoriFilm = res.data.favoriFilm;
       
        }

    }

    return (
        <div className="container p-1 w-100 mt-5 text-light border rounded bg-dark justify-content-center align-items-center">
            <h3>Liste de films</h3>

            <div className="row m-3 ">
                {!erreur && films &&
                    films.map((f, ind) =>
                        //  let link=`/admin/favori/${f.id}`
                        <div key={f.id} className=" col-12 col-sm-6 col-md-3 mb-4 ">
                            <div className="card h-70 ">
                                <img src={new URL(`../assets/${f.image}`, import.meta.url).href} className="card-img-top" alt="film" height="200px" />
                                <div className="card-body">
                                
                                    <h5 className="card-title fs-5 fs-md-4 fs-lg-3" >
                                        {f.genre}
                                    </h5>
                                    <h5 className="card-title  fs-5 fs-md-4 fs-lg-3">
                                        {f.titre}
                                    </h5>
                                    <h5 className="card-title card-title fs-5 fs-md-4 fs-lg-3">
                                        {f.date_sortie}
                                    </h5>
                                    <h5 className="card-text fs-5 fs-md-4 fs-lg-3">
                                        {f.description}

                                    </h5>
                                    <button onClick={()=>addFavori(f.id)} className="btn btn-primary">Ajouter à Favorie</button>
                                </div >
                            </div >
                        </div >
                    )
                }

            </div >



        </div>


    )

}

