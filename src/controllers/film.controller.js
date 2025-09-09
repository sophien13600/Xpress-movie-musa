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
  const path = req.path === '/admin' ? 'admin' : 'index';

  if (films.length > 0) {
    res.render(path, { films });
  } else {
    res.render(path, {
      films: [],
      erreurs: "Aucun film trouvé"
    });
  }
}

const removeFilm = async(req, res, next)=>{
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
  console.log(req.body);
  
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








export default { saveFilm, showFilms, removeFilm, updateFilm }