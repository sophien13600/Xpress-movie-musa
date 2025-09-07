
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
    const user = await userRepository.getUser(req.body.email)
    try {
        if (await bcrypt.compare(req.body.password, user[0].password)) {

            req.session.user = {
                role: user[0].role,
                nom:user[0].nom
            };            
            
            res.redirect('admin' )
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

const logout = (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            return res.redirect('/'); 
        }
     res.redirect('/');
    });
};

export default { signup, login, logout }