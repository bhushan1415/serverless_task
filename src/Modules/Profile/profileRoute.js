const express = require('express')
const ProfileController = require('./profileController');
const ProfileMiddleware = require('./profileMiddleware');

const router = express.Router();
const profileController = new ProfileController();
const profileMiddleware = new ProfileMiddleware();

//Profile Routes
router.get('/:id', profileMiddleware.CheckUserExists, profileController.GetProfile);
router.post('/', profileMiddleware.CheckUser, profileController.CreateProfile);

module.exports = router;