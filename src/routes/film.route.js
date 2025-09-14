import express from 'express'
import filmController from '../controllers/film.controller.js'


const router = express.Router()

router.post('/admin', filmController.saveFilm);
router.get(['/', '/admin'], filmController.showFilms);
router.get('/admin/delete/:id', filmController.removeFilm);
router.post('/admin/update_film/:id', filmController.updateFilm);
router.post(['/search', '/favori/search', '/admin/search', '/login/search', '/signup/search'], filmController.searchFilm);

export default router;