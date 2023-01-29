// backend/routes/api/spots.js
const express = require("express");
const router = express.Router();

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const {
  User,
  Spot,
  Booking,
  Review,
  ReviewImage,
  SpotImage,
} = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

//!DELETE /:imageId
router.delete("/:id", requireAuth, async (req, res, next) => {
  const deleteReviewImage = await SpotImage.findByPk(req.params.id);

  if (!deleteReviewImage) {
    return res.status(404).json({
      message: "Review Image couldn't be found",
      statusCode: 404,
    });
  }
  const review = await Review.findOne({
    where: {
      userId: req.user.id,
    },
  });

  if (review && review.userId !== req.user.id) {
    return res.status(403).json({
      message: "Forbidden",
      statusCode: 403,
    });
  } else {
    deleteReviewImage.destroy();
    return res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });
  }
});


module.exports = router;
