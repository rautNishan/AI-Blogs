const Joi = require("joi");

const UserDto = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().required(),
  password:Joi.string().required()
});
module.exports = UserDto;
