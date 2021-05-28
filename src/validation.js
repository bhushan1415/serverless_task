const { celebrate } = require("celebrate");

const validate = schema => {
  const options = {
    abortEarly: true,
    allowUnknown: true,
    stripUnknown: true
  };
  return celebrate(schema, options);
};

module.exports = validate;
