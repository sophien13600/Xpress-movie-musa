import { useEffect, useState } from "react";
import axios from "../../axios.config.js";
import SaveFilm from "./SaveFilm.jsx";

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

  function modifier(filmId) {
     return async (event) => {
        event.preventDefault();
        try {
          
        } catch (error) {
          
        }
      }
  }
 function suprimer(filmId) {
    return async (event) => {
        event.preventDefault();
    
    try {
    await axios.delete(`/api/films/delete/${filmId}`)
      alert('Film deleted')
        navigate("/dashboard");

    } catch (error) {
      console.error(error);
      alert('Film could not be deleted')
      navigate('/dashboard');
    }
    
  }
 }
  return (
    <>
      <SaveFilm />
      <div className="container p-1 w-100 mt-5 text-light border rounded bg-dark justify-content-center align-items-center">
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-primary text-light border rounded bg-dark">
              <tr>
                <th>Genre</th>
                <th>Titre</th>
                <th>Description</th>
                <th>Date Sortie</th>
                <th>Image</th>
                <th className="text-end">Supprimer</th>
                <th className="text-end">Modifier</th>
              </tr>
            </thead>

            <tbody>
              {!erreur && adminFilms &&
                adminFilms.map((f, ind) => (
                  <tr key={f.id}>
                    <td>
                      <input type="text" className="form-control" name="genre" defaultValue={f.genre} />
                    </td>
                    <td>
                      <input type="text" className="form-control" name="titre" defaultValue={f.titre} />
                    </td>
                    <td>
                      <input type="text" className="form-control" name="description" defaultValue={f.description} />
                    </td>
                    <td>
                      <input
                        type="date" className="form-control" name="date_sortie"
                        defaultValue={f.date_sortie ? new Date(f.date_sortie).toISOString().split("T")[0] : ""}
                      />
                    </td>
                    <td>
                      <input type="hidden" name="image" defaultValue={f.image} />
                      <img src={`/assets/${f.image}`} alt="film" style={{ width: "50px", height: "50px", borderRadius: "2px" }} />
                    </td>
                    <td className="text-end">
                      <form onSubmit={modifier(f.id)}>
                        <button type="submit" className="btn btn-success"> Modifier </button>
                      </form>
                    </td>
                    <td className="text-end">
                      <form onSubmit={suprimer(f.id)}>
                        <button type="submit" className="btn btn-danger"> Supprimer  </button>
                      </form>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </>

  );


}


<h3>Liste de films Admin</h3>

// <div classNameName="row m-3 ">
//     {!erreur && adminFilms &&
//         adminFilms.map((f, ind) =>
//             //  let link=`/admin/favori/${f.id}`
//             <div classNameName=" col-12 col-sm-6 col-md-3 mb-4 ">
//                 <div classNameName="card h-70 ">
//                     <img src={new URL(`../assets/${f.image}`, import.meta.url).href} classNameName="card-img-top" alt="film" height="200px" />
//                     <div classNameName="card-body">
//                         <h5 classNameName="card-title fs-5 fs-md-4 fs-lg-3">
//                             {f.genre}
//                         </h5>
//                         <h5 classNameName="card-title  fs-5 fs-md-4 fs-lg-3">
//                             {f.titre}
//                         </h5>
//                         <h5 classNameName="card-title card-title fs-5 fs-md-4 fs-lg-3">
//                             {f.date_sortie}
//                         </h5>
//                         <h5 classNameName="card-text fs-5 fs-md-4 fs-lg-3">
//                             {f.description}
//                         </h5>
//                         <a href="<%= link %>" classNameName="btn btn-primary">Ajouter à Favorie</a>
//                     </div >
//                 </div >
//             </div >
//         )
//     }



// </div >