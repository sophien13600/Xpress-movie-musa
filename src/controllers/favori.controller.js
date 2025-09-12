import favoriRepository from '../repositories/favori.repository.js'
import filmRepository from '../repositories/film.repository.js';

const saveFavoriFilm= async(req, res, next)=>{
  if (!req.session.user){
    const films = await filmRepository.findAllFilm();
   res.redirect('/');
  } else {
 try {
  const film = await favoriRepository.findFavoriFilmById(req.params.id, req.session.user.id)
  if (film[0]==null) {
    const favori = await favoriRepository.addFavorie(req.params.id, req.session.user.id);
    if (favori == null) {
      console.log("Probleme d'insertion")
      res.redirect('/');
    }
    else {
      console.log(`${favori} a été ajouté au liste de favori`);
      res.redirect('/');
    }
  }else{
    console.log('ce film deja exist aux favoris');
    res.redirect('/');
  }

 } catch (error) {
  const films = await filmRepository.findAllFilm();
   res.render('index', {
           erreur: ["Erreur connexion"],
           films
        });
 }
}
    
}

const showFavoriFilm = async (req, res, next) =>{
 if(req.session.user){
  const films = await favoriRepository.findUserFavori(req.session.user.id);

  if (films.length > 0) {
    res.render('favori', { films });
  } else {
    res.render('favori', {
      films: [],
      erreurs: "Aucun film trouvé"
    });
  }
}
else{
  res.render('favori', {
      films: [],
      erreurs: "Aucun film trouvé"
    });
}
}

const removeFavoriFilm = async (req, res, next) => {
  const f = await favoriRepository.deleteFavoriFilmById(req.params.id)
  if (f == null) {
    res.render('favori',
      {
        erreurs: ["Probleme de supression de donnes"],
        films: favoriRepository.findAllFavori()
      }
    )
  } else {
    console.log(f);
    res.redirect('/favori')
  }

}

export default { saveFavoriFilm, showFavoriFilm, removeFavoriFilm }