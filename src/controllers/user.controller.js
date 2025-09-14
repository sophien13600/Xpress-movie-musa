
import userRepository from '../repositories/user.repository.js'
import filmRepository from '../repositories/film.repository.js'
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
            res.redirect('/');
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
                nom: user[0].nom,
                prenom: user[0].prenom,
                email: user[0].email,
                password: user[0].password,
                id: user[0].id

            };
            res.redirect('admin')
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


const removeUser = async (req, res, next) => {
    const resultat = await userRepository.deleteUser(req.params.id)
    if (resultat) {
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
                return res.redirect('/');
            }
            res.redirect('/');
        });
    } else {
        res.redirect('admin')
    }
}

const updateUser = async (req, res, next) => {
    const films = await filmRepository.findAllFilm();
    const adminFilms = await filmRepository.findAdminFilm(req.session.user.id);

    try {
        const u = await userRepository.updateUser(req.body, req.params.id);
        if (u) {
            const user = await userRepository.getUser(req.body.email);
            req.session.user = {
                id: user[0].id,
                nom: user[0].nom,
                prenom: user[0].prenom,
                email: user[0].email,
                role: user[0].role
            };
            res.render("admin", {
                user: req.session.user,
                adminFilms,
                films
            });
        } else {
            res.render("admin", {
                erreur: ["Probleme d'insertion"],
                user: req.session.user,
                adminFilms,
                films
            });
        }
    } catch (erreur) {
        console.log(erreur);
        res.render("admin", {
            erreur: ["Erreur serveur"],
            user: req.session.user,
            adminFilms,
            films
        });
    }
};


const updatePassword = async (req, res, next) => {
    const { password } = req.body;
    const { id } = req.params;
    const p = await userRepository.updatePassword(id, password)
    const adminFilms = await filmRepository.findAdminFilm(req.session.user.id);
    const films = await filmRepository.findAllFilm();
    const user = await userRepository.getUser(req.body.email)
    try {
        if (!p) {
            return res.render('admin', {
                erreur: ["Problème d'insertion"],
                adminFilms,
                films
            });
        } else {
            console.log(p);
            res.render('admin', {
                adminFilms,
                films
            });
        }
    }
    catch (erreur) {
        console.log(erreur);
        res.render('admin', {
            erreur: ["Erreur serveur"],
            adminFilms,
            films
        });
    }
}

export default { signup, login, logout, removeUser, updateUser, updatePassword }