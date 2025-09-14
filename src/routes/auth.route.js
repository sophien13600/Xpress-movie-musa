import express from 'express'
import userController from '../controllers/user.controller.js'


const router = express.Router()

router.post('/signup', userController.signup)
router.post('/login', userController.login)
router.get('/logout', userController.logout)
router.get('/admin/delete_user/:id', userController.removeUser)
router.post('/admin/update_user/:id', userController.updateUser)
router.post('/admin/update_password/:id', userController.updatePassword)

export default router