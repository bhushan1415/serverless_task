const UserUtil = require('./userUtils');

module.exports = class UserController{
    userUtil = new UserUtil(); // User Utils Object

    //Get All User
    Userget = async(req, res) => {
        try {
            const result = await this.userUtil.UserGet();
            return res.status(200).json(result);
        } catch (err) {
            return res.status(500).json({Error: req.t("ERR_INTERNAL_SERVER")});
        }      
    }

    //Get User By Id
    UserGetById = async(req, res) => {
        try {
            const id = req.params.id
            const result = await this.userUtil.UserGetById(id);
            return res.status(200).json(result);
        } catch (err) {
            return res.status(500).json({Error: req.t("ERR_INTERNAL_SERVER")});;
        }       
    }

    //Add User
    UserCreate = async (req, res) => {
        try {
            await this.userUtil.UserCreate(req.body);
            return res.status(200).json({Message: req.t("USER_ADDED")});
        } catch (err) {
            return res.status(500).json({Error: req.t("ERR_INTERNAL_SERVER")});;
        }
    }

    //Update User
    UserUpdate = async (req, res) => {
        try {
            const id = req.params.id
            await this.userUtil.UserUpdate(req.body, id);
            return res.status(200).json({Message: req.t("USER_UPDATED")});
        } catch (err) {
            return res.status(500).json({Error: req.t("ERR_INTERNAL_SERVER")});;
        }
    }

    //Remove User
    UserRemove = async (req, res) => {
        const id = req.params.id
        await this.userUtil.UserRemove(id);
        return res.status(200).json({Message: req.t("USER_REMOVED")});
    }
}
