// backend/routes/api/spots.js
const express = require("express");
const router = express.Router();

const {
  setTokenCookie,
  requireAuth,
  ownerAuthorization,
} = require("../../utils/auth");
const {
  User,
  Spot,
  Booking,
  Review,
  ReviewImage,
  SpotImage,
  sequelize,
} = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

// SRP
// is it better to have this inside so its on the same query or nah? seems like it would be faster but less clean code.
// const imageless = async (req, res, next) => {
//   let spotImage = await SpotImage.findByPk(req.params.spotId);
//   if (!spotImage) {
//     let err = {};
//     err.message = "Spot Image couldn't be found";
//     err.status = 404;
//     return next(err);
//   }
// };

// ! DELETE /:imageId
// deleting an "existing image"
// router.delete(
//   "/:id",
//   requireAuth,
//   ownerAuthorization,
//   imageless,
//   async (req, res, next) => {
//     const spotImage = await SpotImage.findByPk(req.params.id);
//     if (spotImage.preview === true) {
//       await spotImage.destroy();
//       return res.json({
//         message: "Successfully deleted",
//         statusCode: 200,
//       });
//     }
//   }
// );

module.exports = router;
