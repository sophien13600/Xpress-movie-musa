import express from "express";
import filmController from "../controllers/film.controller.js";

const router = express.Router();

router.get("/api/films", filmController.getAllFilms);
router.get("/api/films/:id", filmController.getAdminFilms);
router.post("/api/films", filmController.saveFilm);
router.delete("/api/films/delete/:id", filmController.removeFilm);
router.post("/api/films/search", filmController.searchFilm);
router.post("/api/films/update/:id", filmController.updateFilm);
router.delete("/api/delete_films/:id", filmController.removeUserFilms);

export default router;
