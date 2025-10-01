import express from "express";
import userController from "../controllers/user.controller.js";

const router = express.Router();

router.post("/api/signup", userController.saveUser);
router.post("/api/login", userController.login);

router.delete("/api/delete_user/:id", userController.removeUser);
router.put("/api/password", userController.updatePassword);

router.put(`/api/update_profil`, userController.updateUser);
router.get("/api/user/:email", userController.getUser);

export default router;
