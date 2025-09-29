import axios from "../../axios.config.js";
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

export default function Favori() {
    const [erreur, setErreur] = useState()
    const [films, setFilms] = useState([]);
    const navigate = useNavigate();

    const storedUser = localStorage.getItem('user');
    const userInfo = storedUser ? JSON.parse(storedUser) : null;


    useEffect(() => {
        if (!userInfo) {
            alert('Please log in to show a movie to your favorites.')
            navigate('/login')
        } else {
            axios.get(`/api/favoris/${userInfo.id}`)
                .then(res => {
                    setFilms(res.data);
                })
                .catch(error => {
                    console.error("There was an error!", error);
                });
        }
    })
    async function removeFavori(filmId) {
        try {
            await axios.delete(`/api/favoris/${filmId}`)
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div style={{ width: "1200px" }}>
            <div className="container p-1 w-100 mt-5 text-light border rounded bg-dark justify-content-center align-items-center" >
                <h3>Liste de films</h3>
                <div className="row m-3 ">
                    {!erreur && films &&
                        films.map((f, ind) =>
                            //  let link=`/admin/favori/${f.id}`
                            <div key={f.id} className=" col-12 col-sm-6 col-md-3 mb-4 ">
                                <div className="card h-70 ">

                                    <img src={new URL(`../assets/${f.image}`, import.meta.url).href} className="card-img-top" alt="film" height="200px" />
                                    <div className="card-body">
                                        <h5 className="card-title fs-5 fs-md-4 fs-lg-3">
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
                                        <button onClick={() => removeFavori(f.id)} className="btn btn-primary">Suprimer de Favorie</button>
                                    </div >
                                </div >
                            </div >
                        )
                    }

                </div >



            </div>
        </div>



    )
}
