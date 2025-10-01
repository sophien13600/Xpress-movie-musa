import express from "express";
import favoriController from "../controllers/favori.controller.js";

const router = express.Router();

router.post("/api/favoris", favoriController.addFavorie);
router.get("/api/favoris/:id", favoriController.showFavoriFilm);
router.delete("/api/favoris/:id", favoriController.removeFavoriFilm);

export default router;
