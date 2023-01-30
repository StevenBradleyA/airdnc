// backend/utils/validation.js
const { validationResult } = require("express-validator");

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = {};

    for (const curr of validationErrors.array()) {
      console.log(curr)
      const key = curr.param;
      const value = curr.msg;
      errors[key] = value;
    }
    const err = Error("Bad request.");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad request.";
    err.message = "Validation error";
    err.statusCode = 400;
    next(err);
  }
  next();
};

module.exports = {
  handleValidationErrors,
};
