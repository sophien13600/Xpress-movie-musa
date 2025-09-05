import connection from '../config/db.config.js';

const save = async (film) => {   
        try {
            const INSERT = "INSERT INTO films values (null, ?, ?, ?,?,?)"
            const resultat = await connection.query(INSERT, [film.titre, film.genre, film.description, film.date_sortie, film.image]);
            film.id = resultat[0].insertId
    
            return film;
        } catch (error) {
            console.log(error);
            return null;
        }
    
}

const findAll = async ()=>{
    try {
        const SELECT = "SELECT * from films"
        const res=  await connection.query(SELECT)
        return films ;
    } catch (error) {
        console.log(error);
        return null;
    }
    
}

export default { save, findAll };