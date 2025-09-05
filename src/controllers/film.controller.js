import filmRepository from '../repositories/film.repository.js'

const saveFilm = async (req, res, next) => {  
    console.log(req.body);
    
    try {
        if(req.body.genre!='' || req.body.titre!=''){
            const film = await filmRepository.save(req.body)
            if (film == null) {
                console.log("Probleme d'insertion")
            }
            else {

                console.log(`${film} a été enregistré`);
            }
        }
        else{
            console.log( 'genre et le titre doivent être complets')
        } 
    }
    catch (erreur) {
        console.log(erreur);
    }
    res.render('admin')
}

const showFilms =async (req, res, next)=>{
    const films = await filmRepository.findAll()
    console.log(films);
    
    if (films) {
        res.render('admin', {
            films 
        })
        
    } else {
        res.render('personne', {
            films: [],
            erreurs: null
        })
    }

}

export default { saveFilm, showFilms }