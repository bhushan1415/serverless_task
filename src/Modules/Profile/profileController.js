const ProfileUtils = require('./profileUtils');

module.exports = class ProfileController {
    profileUtils = new ProfileUtils();

     GetProfile = async (req, res) => {
         try {
            const id = req.params.id
            const result = await this.profileUtils.GetProfile(id);
            if(result.length != 0){
                return res.status(200).json(result);
            } else {
                return res.status(200).json({Message: req.t("FILL_PROFILE")});
            }
         } catch (err) {
            return res.status(500).json({Error: req.t("ERR_INTERNAL_SERVER")});
         }
     }

     CreateProfile = async (req, res) => {
         try {
             await this.profileUtils.CreateProfile(req.body);
             return res.status(200).json({Message: req.t("PROFILE_CREATED")})
         } catch (err) {
            return res.status(500).json({Error: req.t("ERR_INTERNAL_SERVER")});
         }
     }
}