import favoriRepository from "../api/repositories/favori.repository.js";

const addFavorie = async (req, res, next) => {
  try {
    const film = await favoriRepository.findFavoriFilmById(
      req.body.filmId,
      req.body.userId
    );
    if (film[0] == null) {
      const favoriFilm = await favoriRepository.addFavorie(
        req.body.filmId,
        req.body.userId
      );
      return res.status(200).json(favoriFilm);
    } else {
      return res.sendStatus(400);
    }
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};
const showFavoriFilm = async (req, res, next) => {
  try {
    const films = await favoriRepository.findUserFavori(req.params.id);
    return res.status(200).json(films);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};
const removeFavoriFilm = async (req, res, next) => {
  try {
    const res = await favoriRepository.deleteFavoriFilmById(req.params.id);
    return res.status(200);
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
};

export default { removeFavoriFilm, showFavoriFilm, addFavorie };
