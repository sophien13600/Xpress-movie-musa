
import filmRepository from '../../repositories/film.repository.js';


const getAllFilms = async (req, res) => {
    try {
        const films = await filmRepository.findAllFilm();
 
       
        console.log(req.session.user_id);
        const adminFilms = await filmRepository.findAdminFilm(17);
           
        return res.status(200).json({ films, adminFilms }


        );
    } catch (err) {
        console.error(err);
        return res.status(500);
    }
};


export default { getAllFilms, };
