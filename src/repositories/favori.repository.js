import connection from '../config/db.config.js';
const addFavorie = async( film_id,user_id)=>{
    try {
        const INSERT = "INSERT into favoris VALUES (null, ?,?,? );"
        const today = new Date();
        const resultat = await connection.query(INSERT, [today, film_id, user_id]);
        return resultat;
        
    } catch (error) {
        console.log(error);
        return null;
    }

}
const findAllFavori = async()=>{
    try {
        const SELECT = "SELECT * FROM films JOIN favoris as f on f.film_id = films.id; "
        const [favoris] = await connection.query(SELECT);
        return favoris;
    } catch (error) {
        console.log(error);
        return null;
    }
}
const findFavoriFilmById = async (id, user_id) => {
    try {
        const SELECT = "SELECT * FROM films JOIN favoris as f on f.film_id = films.id where films.id =? and f.user_id=?; "
        const [film] = await connection.query(SELECT, [id, user_id]);
        return film;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const findUserFavori = async (user_id) => {
    try {
        const SELECT = "SELECT * FROM films JOIN favoris as f on f.film_id = films.id where f.user_id =?; "
        const [film] = await connection.query(SELECT, [user_id]);
        return film;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const deleteFavoriFilmById = async (id) => {
    try {
        const DELETE = "Delete from favoris where id=?"
        await connection.query(DELETE, id);
        return true;
    } catch (error) {
        console.log(error);
        return null;
    }
}
export default { addFavorie, findAllFavori, findFavoriFilmById, deleteFavoriFilmById, findUserFavori };