// backend/routes/api/users.js
const express = require("express");
const router = express.Router();

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const user = require("../../db/models/user");

const validateSignup = [
  check("firstName")
    .exists({ checkFalsy: true })
    .isLength({ min: 1 })
    .withMessage("Please provide a firstName with at least 1 character."),
  check("lastName")
    .exists({ checkFalsy: true })
    .isLength({ min: 1 })
    .withMessage("Please provide a lastName with at least 1 character."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

router.post("/", validateSignup, async (req, res) => {
  const { firstName, lastName, email, password, username } = req.body;

  const findUsername = await User.findOne({
    where: { username },
  });
  const findEmail = await User.findOne({
    where: { email },
  });
  const errors = {};
  if (findUsername) {
    errors.username = "User with that username already exists";
  }
  if (findEmail) {
    errors.email = "User with that email already exists";
  }

  if (errors.username || errors.email) {
    return res.status(403).json({
      message: "User already exists",
      statusCode: 403,
      errors,
    });
  }

  const user = await User.signup({
    firstName,
    lastName,
    email,
    username,
    password,
  });

  await setTokenCookie(res, user);

  return res.json(user);
});

module.exports = router;
