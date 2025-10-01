import { useEffect, useState, useContext } from "react";
import axios from "../../axios.config.js";
import SaveFilm from './SaveFilm.jsx';
import { GlobalContext } from "../contexts/GlobalContext.jsx";
import { use } from "react";

export default function AdminFilms() {

  const { getFilms, adminFilms, setAdminFilms, userInfo, setUserInfo } = useContext(GlobalContext);
  const [erreur, setErreur] = useState()

  
  useEffect(() => {
    if (userInfo?.id) getFilms();

  }, []);

  function modifier(filmId) {
    return async (event) => {
      event.preventDefault();
      try {

      } catch (error) {

      }
    }
  }
  
  async function suprimer(filmId) {
    try {
      await axios.delete(`/api/films/delete/${filmId}`)
      getFilms();
     
    } catch (error) {
      console.error(error);
      alert('Film could not be deleted')
      navigate('/dashboard');
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

                      <button onClick={() => suprimer(f.id)} className="btn btn-danger"> Supprimer  </button>

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
