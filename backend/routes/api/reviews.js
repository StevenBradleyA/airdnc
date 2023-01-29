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

//todo POST /:reviewId/images
// add an image to a review base on the review's id
router.post("/:id/images", requireAuth, async (req, res, next) => {
  const { url } = req.body;
  const review = await Review.findByPk(req.params.id);

  if (!review) {
    return res.status(404).json({
      message: "Review couldn't be found",
      statusCode: 404,
    });
  }

  const checkExistingReviewImages = await ReviewImage.findAll({
    where: {
      reviewId: req.params.id,
    },
  });

  if (checkExistingReviewImages.length >= 10) {
    return res.status(403).json({
      message: "Maximum number of images for this resource was reached",
      statusCode: 403,
    });
  }

  const newReviewImage = await ReviewImage.create({
    reviewId: review.id,
    url,
  });

  consolePog(newReviewImage);
  const viewNewReviewImage = await ReviewImage.findOne({
    attributes: ["id", "url"],
    where: {
      id: newReviewImage.id,
    },
  });
  return res.json(viewNewReviewImage);
});

//todo PUT /:reviewId
router.put("/:id", requireAuth, async (req, res, next) => {
  const { review, stars } = req.body;
  const errors = {};

  if (!review) {
    errors.review = "Review text is required";
  }
  if (!stars) {
    errors.stars = "Stars must be an integer from 1 to 5";
  }

  if (errors.review || errors.stars) {
    return res.status(400).json({
      message: "Validation Error",
      statusCode: 400,
      errors,
    });
  }
  const editReview = await Review.findByPk(req.params.id);

  if (!editReview) {
    return res.status(404).json({
      message: "Review couldn't be found",
      statusCode: 404,
    });
  }

  if (editReview && editReview.userId !== req.user.id) {
    return res.status(403).json({
      message: "Forbidden",
      statusCode: 403,
    });
  } else {
    editReview.set({
      review,
      stars,
    });

    await editReview.save();

    res.json(editReview);
  }
});

//! DELETE /:reviewId
router.delete("/:id", requireAuth, async (req, res, next) => {
  const deleteReview = await Review.findByPk(req.params.id);

  if (!deleteReview) {
    return res.status(404).json({
      message: "Review couldn't be found",
      statusCode: 404,
    });
  }

  if (deleteReview && deleteReview.userId !== req.user.id) {
    return res.status(403).json({
      message: "Forbidden",
      statusCode: 403,
    });
  } else {
    deleteReview.destroy();

    return res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });
  }
});

module.exports = router;
