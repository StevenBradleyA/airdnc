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

//!DELETE /:imageId
router.delete("/:id", requireAuth, async (req, res, next) => {
  const deleteSpotImage = await SpotImage.findByPk(req.params.id);

  if (!deleteSpotImage) {
    return res.status(404).json({
      message: "Spot Image couldn't be found",
      statusCode: 404,
    });
  }


  const spot = await Spot.findOne({
    where: {
      id: deleteSpotImage.spotId,
    },
  });

  if (spot && spot.ownerId !== req.user.id) {
    return res.status(403).json({
      message: "Forbidden",
      statusCode: 403,
    });
  } else {
    deleteSpotImage.destroy();
    return res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });
  }
});

module.exports = router;
