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
const { consolePog } = require("../../utils/custom");

//* GET /current
// returns all reviews written by the current user
router.get("/current", requireAuth, async (req, res, next) => {
  const reviews = await Review.findAll({
    where: {
      userId: req.user.id,
    },
  });
  const reviewData = [];
  for (const currentReview of reviews) {
    const review = currentReview.toJSON();

    const user = await User.findOne({
      attributes: ["id", "firstName", "lastName"],
      where: {
        id: review.userId,
      },
    });
    review.User = user.toJSON();

    const reviewedSpot = await Spot.findOne({
      attributes: [
        "id",
        "ownerId",
        "address",
        "city",
        "state",
        "country",
        "lat",
        "lng",
        "name",
        "price",
      ],
      where: {
        id: review.spotId,
      },
    });
    const spotObj = reviewedSpot.toJSON();

    review.Spot = spotObj;

    const spotImage = await SpotImage.findOne({
      attributes: ["url"],
      where: {
        spotId: review.spotId,
        preview: true,
      },
    });
    const url = spotImage.toJSON();

    const previewImage = url.url;
    spotObj.previewImage = previewImage;

    const reviewImage = await ReviewImage.findAll({
      attributes: ["id", "url"],
      where: {
        id: review.id,
      },
    });

    review.ReviewImages = reviewImage;

    reviewData.push(review);
  }

  return res.json(reviewData);
});

module.exports = router;
