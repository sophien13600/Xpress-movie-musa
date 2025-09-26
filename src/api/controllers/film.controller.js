
import filmRepository from '../../repositories/film.repository.js';


const getAllFilms = async (req, res) => {
    try {
        const films = await filmRepository.findAllFilm();      
        return res.status(200).json(films);
    } catch (err) {
        console.error(err);
        return res.status(500);
    }
};
const getAdminFilms = async (req, res) => {
    try {
        const adminFilms = await filmRepository.findAdminFilm(req.params.id);
           
        return res.status(200).json(adminFilms );
    } catch (err) {
        console.error(err);
        return res.status(500);
    }
};


export default { getAllFilms, getAdminFilms};
