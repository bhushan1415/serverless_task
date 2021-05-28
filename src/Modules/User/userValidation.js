const { Joi, Segments } = require("celebrate");

module.exports = {
    getUser: {
        [Segments.PARAMS]: {
          id: Joi.number().min(1).required().messages({"string.base": `User Id is Not Valid`})
        }
    },
    createUser: {
        [Segments.BODY]: {
            FirstName: Joi.required(),
            LastName: Joi.required(),
            Email: Joi.email().required()
        }
    },
    updateUser: {
        [Segments.PARAMS]: {
            id: Joi.number().min(1).required().messages({"string.base": `User Id is Not Valid`})
        },
        [Segments.BODY]: {
            FirstName: Joi.required(),
            LastName: Joi.required(),
            Email: Joi.email().required()
        }
    }
}