import express from 'express'
import 'dotenv/config'
import session from 'express-session'
import userRouter from './src/routes/auth.route.js';
import filmRouter from './src/routes/film.route.js';
import filmRepository from './src/repositories/film.repository.js';


const app = express()

// configurer la session
app.use(session({
    secret: 'express-ejs',
    resave: false,
    saveUninitialized: false

}))

app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// utiliser le middleware body-parser
app.use(express.urlencoded())

// configurer les ressources statiques
app.use(express.static('public'))


// Mapping entre routes et le routeur
app.use('/', userRouter);
app.use('/', filmRouter);

// Configuration du moteur de template
app.set('view engine', 'ejs')
app.set('views', import.meta.dirname + '/templates')

// modifier le delimiter
// app.set('view options', { delimiter: '?' })


app.get(['/login'], (req, res) => {
    res.render('login')
})
app.get(['/signup'], (req, res) => {
    res.render('signup')
})

// app.get(['/admin'], async (req, res) => {
//     const films = await filmRepository.findAll();
//     res.render('admin', { films: films || [] })
// })

app.all("/*splat", (req, res) => {
    res
        .status(404)
        .end("Page introuvable")
})


const PORT = process.env.PORT || 5555

app.listen(PORT, () => {
    console.log(`Adresse serveur : http://localhost:${PORT}`);
})