import { useEffect, useState } from "react";
import axios from "../../axios.config.js";

export default function AdminFilms() {
    const [adminFilms, setAdminFilms] = useState([]);
    const [erreur, setErreur] = useState()

    useEffect(() => {
        axios.get("/api/films/")
            .then(response => {
                setAdminFilms(response.data.adminFilms);
            })
            .catch(error => { console.error("There was an error!", error); });
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
                                <img src={`/assets/${f.image}`} className="card-img-top" alt="film" height="200px" />
                                <div className="card-body">
                                    <h5 className="card-title fs-5 fs-md-4 fs-lg-3">
                                        {f.genre}
                                    </h5>
                                    <h5 className="card-title  fs-5 fs-md-4 fs-lg-3">
                                        {f.titre}
                                    </h5>
                                    <h5 className="card-title card-title fs-5 fs-md-4 fs-lg-3">
                                        {/* (f.date_sortie) */}
                                    </h5>
                                    <p className="card-text fs-5 fs-md-4 fs-lg-3">
                                        {f.description}
                                    </p>
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