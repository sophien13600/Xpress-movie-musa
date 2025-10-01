import express from 'express'
import 'dotenv/config'
import session from 'express-session'
import userRouter from './src/routes/auth.route.js';
import filmRouter from './src/routes/film.route.js';
import favoriRouter from './src/routes/favori.route.js';
import filmApiRoutes from './src/api/routes/film.route.js'
import userApiRoutes from './src/api/routes/auth.route.js'
import favoriApiRoutes from './src/api/routes/favori.route.js'

import cors from "cors";


const app = express()

// app.use
// (cors());
app.use(cors({
    origin: 'https://papaya-gaufre-36ab9d.netlify.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
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
app.use(express.json())

// configurer les ressources statiques
app.use(express.static('public'))


// Mapping entre routes et le routeur
app.use('/', userRouter);
app.use('/', filmRouter);
app.use('/', favoriRouter);

app.use("/", filmApiRoutes);
app.use("/", userApiRoutes);
app.use("/", favoriApiRoutes);

// Configuration du moteur de template
app.set('view engine', 'ejs')
app.set('views', import.meta.dirname + '/templates')

app.use('/public', express.static('public'))

// modifier le delimiter
// app.set('view options', { delimiter: '?' })


app.get(['/login'], (req, res) => {
    res.render('login')
})
app.get(['/signup'], (req, res) => {
    res.render('signup')
})
app.get(['/favori'], async (req, res) => {
    res.render('favori')
})
app.get(['/search'], async (req, res) => {
    res.render('search')
})




app.all("/*splat", (req, res) => {
    res
        .status(404)
        .end("Page introuvable")
})


const PORT = process.env.PORT || 5555

app.listen(PORT, () => {
    console.log(`Adresse serveur : http://localhost:${PORT}`);
})