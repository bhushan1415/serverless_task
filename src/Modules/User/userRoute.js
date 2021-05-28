const express = require('express')
const UserController = require('./userController');
const UserMiddleware = require('./userMiddleware');
const UserValidation = require('./userValidation');
const validate = require('../../validation');

const router = express.Router();
const userController = new UserController();
const userMiddleware = new UserMiddleware();

//User Routes
router.get('/', userController.Userget);
router.get('/:id', validate(UserValidation.getUser), userMiddleware.CheckUserExists, userController.UserGetById);
router.post('/', validate(UserValidation.createUser), userController.UserCreate);
router.post('/:id', validate(UserValidation.updateUser), userMiddleware.CheckUserExists, userController.UserUpdate);
router.delete('/:id', validate(UserValidation.getUser), userMiddleware.CheckUserExists, userController.UserRemove)

module.exports = router;