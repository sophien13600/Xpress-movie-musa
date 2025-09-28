import express from 'express';
import userController from '../controllers/user.controller.js'


const router = express.Router()

router.post('/api/signup', userController.saveUser)
router.post('/api/login', userController.login)

// router.get('/admin/delete_user/:id', userController.removeUser)
// router.post('/admin/update/user/:id', userController.updateUser)
// router.post('/admin/update/password/:id', userController.updatePassword)

export default router;