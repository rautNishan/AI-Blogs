const express = require("express");
const router = express.Router();
const UserDto = require("../modules/users/dtos/user.dto");

const Joi = require("joi");
const HttpError = require("../utils/ErrorClass/HttpError");

router.get("/", (req, res) => {
  res.send("Get User");
});

router.post("/create", (req, res) => {
  //First Validate incoming request
  const { error } = UserDto.validate(req.body);
  if (error) {
    console.log('Yes there is error');
    throw new HttpError(400,error.details[0].message)
  }
});

module.exports = router;
