
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

        return res.status(200).json(adminFilms);
    } catch (err) {
        console.error(err);
        return res.status(500);
    }
};

const saveFilm = async (req, res) => {
    try {
        const film = await filmRepository.save(req.body, req.body.userId)
        return res.status(200).json(film)

    }

    catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }

}

const removeFilm = async (req, res) => {
    try {
        await filmRepository.deleteFilmById(req.params.id)
        return res.status(200)
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
}

const searchFilm = async (req, res, next) => {
      const searchQuery = req.body.search;
    console.log("Backend search query:", searchQuery);

    try {
        const films = await filmRepository.searchFilms(searchQuery);
        return res.status(200).json(films);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
};

export default { removeFilm, getAllFilms, getAdminFilms, saveFilm, searchFilm };
