import express from 'express'
import favoriController from '../controllers/favori.controller.js'


const router = express.Router()

router.get('/admin/favori/:id', favoriController.saveFavoriFilm);
router.get('/admin/favori/delete/:id', favoriController.removeFavoriFilm);


export default router;