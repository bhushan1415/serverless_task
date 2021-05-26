const ProfileUtils = require('./profileUtils');

module.exports = class ProfileMiddleware {
    profileUtils = new ProfileUtils(); // User Utils Object

    CheckUserExists = async (req, res, next) => {
        try {
            const id = req.params.id
            const result = await this.profileUtils.checkUserExists(id);
            if(result){
                next()
            } else {
                return res.status(200).json({Message: req.t("NO_RECORD_FOUND")});
            }
        } catch (err) {
            console.log(err)
        }
    }

    CheckUser = async (req, res, next) => {
        try {
            const id = req.body.user_id
            const result = await this.profileUtils.checkUserExists(id);
            if(result){
                next()
            } else {
                return res.status(200).json({Message: req.t("NO_USER_FOUND")});
            }
        } catch (err) {
            console.log(err)
        }
    }
}