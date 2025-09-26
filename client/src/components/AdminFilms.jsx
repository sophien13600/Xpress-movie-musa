import { useEffect, useState } from "react";
import axios from "../../axios.config.js";

export default function AdminFilms() {
    const [adminFilms, setAdminFilms] = useState([]);
    const [erreur, setErreur] = useState()

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const userInfo = storedUser ? JSON.parse(storedUser) : null;

        axios.get(`/api/films/${userInfo.id}`)
            .then(response => {
                setAdminFilms(response.data);
            })
            .catch(error => {
                console.error("There was an error!", error);
            });

    }, []);

    return (
        <div className="container p-1 w-100 mt-5 text-light border rounded bg-dark justify-content-center align-items-center">
            <h3>Liste de films Admin</h3>

            <div className="row m-3 ">
                {!erreur && adminFilms &&
                    adminFilms.map((f, ind) =>
                        //  let link=`/admin/favori/${f.id}`
                        <div className=" col-12 col-sm-6 col-md-3 mb-4 ">
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
                                    <a href="<%= link %>" className="btn btn-primary">Ajouter à Favorie</a>
                                </div >
                            </div >
                        </div >
                    )
                }

            </div >



        </div>


    )
}