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

const reviewAuthorization = async (req, res, next) => {
  let review = await Review.findByPk(req.params.userId);
  if (review.userId !== req.user.id) {
    res.statusCode = 403;
    return res.json({
      message: "Forbidden",
      statusCode: 403,
    });
  }
};

const imageless = async (req, res, next) => {
  let reviewImage = await ReviewImage.findByPk(req.params.reviewId);
  if (!reviewImage) {
    let err = {};
    err.message = "Review Image couldn't be found";
    err.status = 404;
    return next(err);
  }
};

// ! DELETE /:imageId
// delete an "existing image" for a review
router.delete(
  "/:id",
  requireAuth,
  reviewAuthorization,
  imageless,
  async (req, res, next) => {
    const reviewImage = await ReviewImage.findByPk(req.params.id);
    if (reviewImage) {
      await reviewImage.destroy();
      return res.json({
        message: "Successfully deleted",
        statusCode: 200,
      });
    }
  }
);

module.exports = router;
