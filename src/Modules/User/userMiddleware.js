const UserUtil = require('./userUtils');

module.exports = class UserMiddleware {
    userUtil = new UserUtil(); // User Utils Object

    CheckUserExists = async (req, res, next) => {
        try {
            const id = req.params.id
            const result = await this.userUtil.checkUserExists(id);
            if(result){
                next()
            } else {
                return res.status(200).json({Message: req.t("NO_RECORD_FOUND")});
            }
        } catch (err) {
            return res.status(500).json({Error: req.t("ERR_INTERNAL_SERVER")});
        }
    }
}