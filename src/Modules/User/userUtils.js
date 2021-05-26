const db = require('../../models/index');

module.exports = class userUtils {
    async UserGet(){
        try {
            const result = await db.User.findAll({attributes: ['id','FirstName', 'LastName', 'Email']});
            return result;
        } catch (err) {
            console.log(err);
        }
    }

    async UserGetById(id){
        try {
            const result = await db.User.findOne({where: {id}})
            return result;
        } catch (err) {
            console.log(err);
        }
    }
    async UserCreate(details){
        try {
            return await db.User.create(details);
        } catch (err) {
            console.log(err);
        }
    }

    async checkUserExists(id){
        try {
            return await db.User.findOne({where: {id}});
        } catch (err) {
            console.log(err)
        }
    }

    async UserUpdate(detaisl, id) {
        try {
            return await db.User.update(detaisl,{where: {id}})
        } catch (err) {
            console.log(err)
        }
    }

    async UserRemove(id) {
         try {
             return await db.User.destroy({where: {id}})
         } catch (err) {
             console.log(err);
         }
    }
}