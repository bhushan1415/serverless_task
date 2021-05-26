const express = require('express')
const UserController = require('./userController');
const UserMiddleware = require('./userMiddleware');

const router = express.Router();
const userController = new UserController();
const userMiddleware = new UserMiddleware();

//User Routes
router.get('/', userController.Userget);
router.get('/:id', userMiddleware.CheckUserExists, userController.UserGetById);
router.post('/', userController.UserCreate);
router.post('/:id', userMiddleware.CheckUserExists, userController.UserUpdate);
router.delete('/:id', userMiddleware.CheckUserExists, userController.UserRemove)

module.exports = router;