const findAll = async ()=>{
    try {
        const SELECT = "SELECT * from films"
        const films=  await connection.query(SELECT)
        console.log(films);
        return films ;
    } catch (error) {
        console.log(error);
        return null;
    }
}