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
// Return all the bookings that the current user has made.
router.get("/current", requireAuth, async (req, res, next) => {
  const bookings = await Booking.findAll({
    where: {
      userId: req.user.id,
    },
  });

  const bookingData = [];
  for (const currentBook of bookings) {
    const booking = currentBook.toJSON();
    const spot = await Spot.findOne({
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
        id: booking.spotId
      },
    });

    const spotObj = spot.toJSON();

    booking.Spot = spotObj;

    const spotImage = await SpotImage.findOne({
      attributes: ["url"],
      where: {
        spotId: booking.spotId,
        preview: true,
      },
    });

    const url = spotImage.toJSON();

    const previewImage = url.url;
    spotObj.previewImage = previewImage;

    bookingData.push(booking);
  }



  return res.json(bookingData);
});

module.exports = router;
