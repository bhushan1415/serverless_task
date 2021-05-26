const db = require('../../models/index');

module.exports = class ProfileUtils {
    //get profile by user id
    async GetProfile(id) {
        try {
            const result = await db.Profile.findAll({include: [{model: db.User, as: "UserProfile"}],where: {user_id: id}});
            const resObj = []
            result.map((e)=> {
                return resObj.push({ProfileId: e.id, FullName: e.fullname, Birthdate: e.birthdate, Gender: e.gender, Position: e.position, Email: e.UserProfile.Email})
            })
            return resObj;
        } catch (err) {
            throw err;
        }
    }

    async checkUserExists(id){
        try {
            return await db.User.findOne({where: {id}});
        } catch (err) {
            throw err;
        }
    }

    async CreateProfile(details) {
        try {
            return await db.Profile.create(details);
        } catch (err) {
            throw err;
        }
    }

}