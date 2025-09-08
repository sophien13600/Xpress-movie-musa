import express from 'express'
import filmController from '../controllers/film.controller.js'


const router = express.Router()

router.post('/admin', filmController.saveFilm);
router.get(['/','/admin'], filmController.showFilms);
router.get('/admin/delete/:id', filmController.removeFilm);
router.post('/admin/update/:id', filmController.updateFilm);



export default router;