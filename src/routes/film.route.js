import express from 'express'
import filmController from '../controllers/film.controller.js'


const router = express.Router()

router.post('/admin', filmController.saveFilm);



export default router;