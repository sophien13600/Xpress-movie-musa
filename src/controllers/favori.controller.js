import favoriRepository from '../repositories/favori.repository.js'

const saveFavoriFilm= async(req, res, next)=>{
 
  const film = await favoriRepository.findFavoriFilmById(req.params.id, req.session.user.id)

  
  if (film[0]==null) {
    const favori = await favoriRepository.addFavorie(req.params.id, req.session.user.id);
    if (favori == null) {
      console.log("Probleme d'insertion")
      res.redirect('/admin');
    }
    else {
      console.log(`${favori} a été ajouté au liste de favori`);
      res.redirect('/admin');
    }
  }else{
    console.log('ce film deja exist aux favoris');
    res.redirect('/admin');
  }
    
}

const showFavoriFilm = async (req, res, next) =>{
 
  const films = await favoriRepository.findUserFavori(req.session.user.id);

  if (films.length > 0) {
    res.render('/favori', { films });
  } else {
    res.render('/favori', {
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