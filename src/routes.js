const express = require('express')
const l10n = require('jm-ez-l10n');

const UserRoute = require('./Modules/User/userRoute');
const ProfileRoute = require('./Modules/Profile/profileRoute');

module.exports = class Routes {
    
    path(){
        const router = express.Router();

        router.use('/user', UserRoute);
        router.use('/profile', ProfileRoute);

        router.all('/*', (req, res) => {
        return res.status(404).json({error: req.t("ERR_URL_NOT_FOUND")})
        });
        return router;
    }
}