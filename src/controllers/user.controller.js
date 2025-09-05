
import userRepository from '../repositories/user.repository.js'
import bcrypt from "bcrypt";

const signup = async (req, res, next) => {
    const user = await userRepository.save(req.body)    
    try {
        if (user == null) {
            res.render('signup',
                {
                    erreur: ["Probleme d'insertion"],
                }
            )
        } else {
            console.log(user);
            //    const films = await filmRepository.findAll()
            res.render('index'  // films
            )
        }
    }
    catch (erreur) {
        console.log(erreur);
        res.render('signup')
    }
}

const login = async (req, res, next) => {
    console.log(req.body);
    const user = await userRepository.getUser(req.body.email)
    try {  
        if (await bcrypt.compare(req.body.password, user[0]['password'])) {
            if(user[0]['role']=='admin'){
                res.render('admin',
                    console.log("Login est succes")
                )    
            }else{
                res.render('abonne',
                    console.log("Login est succes") 
            )}
            
        }
        else {
            res.render('login',
                console.log("Password n'est pas correct")
            )
        }

    } catch (error) {
        console.log(error);
        res.render('login')
    }

}

export default { signup, login }