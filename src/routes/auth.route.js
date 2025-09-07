import express from 'express'
import userController from '../controllers/user.controller.js'


const router = express.Router()

router.post('/signup', userController.signup)
router.post('/login', userController.login)
router.get('/logout', userController.logout)

export default router