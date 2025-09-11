import filmRepository from '../repositories/film.repository.js';


const saveFilm = async (req, res, next) => {
  try {
    if (req.body.genre != '' || req.body.titre != '') {
      const film = await filmRepository.save(req.body, req.session.user.id)
      if (film == null) {
        console.log("Probleme d'insertion")
      }
      else {
        console.log(`${film} a été enregistré`);
      }
    }
    else {
      console.log('genre et le titre doivent être complets')
    }
  }
  catch (erreur) {
    console.log(erreur);
  }
  res.redirect('/admin');
}

const showFilms = async (req, res, next) => {
  const films = await filmRepository.findAllFilm();
  let adminFilms=[];
  if (req.session.user) {
   adminFilms = await filmRepository.findAdminFilm(req.session.user.id);
  }
  const path = req.path === '/admin' ? 'admin' : 'index';

  if (films.length > 0) {
    res.render(path, { films, adminFilms });
  } else {
    res.render(path, {
      films: [],
      adminFilms: [],
      erreurs: "Aucun film trouvé"
    });
  }
}



const removeFilm = async (req, res, next) => {
  const f = await filmRepository.deleteFilmById(req.params.id)
  if (f == null) {
    res.render('admin',
      {
        erreurs: ["Probleme d'isupression de donnes"],
        films: filmRepository.findAllFilm()
      }
    )
  } else {
    console.log(f);
    res.redirect('/admin')
  }

}
const updateFilm = async (req, res, next) => {
  try {
    if (req.body.genre != '' || req.body.titre != '') {
      const film = await filmRepository.updateFilmById(req.body, req.params.id)
      if (film == null) {
        console.log("Probleme modification")
      }
      else {
        console.log(`${film} a été modifié`);
      }
    }
    else {
      console.log('genre et le titre doivent être complets')
    }
  }
  catch (erreur) {
    console.log(erreur);
  }
  res.redirect('/admin');

}

const searchFilm= async (req, res, next)=>{
const films = await filmRepository.searchFilms(req.body.search);
   if (films.length > 0) {
    res.render('search', { films });
  } else {
    res.render('search', {
      films: [],
      erreurs: "Aucun film trouvé"
    });
  }
}







export default { saveFilm, showFilms, removeFilm, updateFilm, searchFilm }