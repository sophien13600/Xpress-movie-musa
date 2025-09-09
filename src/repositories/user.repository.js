import connection from '../config/db.config.js'
import bcrypt from "bcrypt";

const save = async (user) => {
    const saltRounds = 10;
    const password = await bcrypt.hash(user.password, saltRounds);
    try {
        const INSERT = "INSERT INTO users values (null, ?, ?, ?,?,?)"
        const resultat = await connection.query(INSERT, [user.nom, user.prenom, user.email, password, user.role]);
        user.id = resultat[0].insertId
        return user;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const getUser = async (email)=>{
    try {
        const SELECT = "SELECT * from users where email = ?"
        const user = await connection.query(SELECT, email) 
        return user[0];

    } catch (error) {
        console.log(error=" Email n'est pas trouvé");
        return null;
    }
}

const deleteUser = async (id) => {
    try {
        const DELETE ="DELETE from users where id=?"
        return await connection.query(DELETE, [id]);
        
    } catch (error) {
        console.log("User n'est pas trouvé :", error);
        return null;
    }
}

export default { save, getUser, deleteUser }