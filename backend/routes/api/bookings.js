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
const { ResultWithContext } = require("express-validator/src/chain");


const getDateString = (date) => {
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const day = date.getDate() + 1;
  const displayDate = `${year}-${month}-${day}`;
  return displayDate;
};





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
        id: booking.spotId,
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
    const startDate = booking.startDate;
    const endDate = booking.endDate;

    booking.startDate = getDateString(startDate);
    booking.endDate = getDateString(endDate);
    bookingData.push(booking);
  }

  return res.json(bookingData);
});

//! DELETE /:bookingId
router.delete("/:id", requireAuth, async (req, res, next) => {
  const deleteBooking = await Booking.findByPk(req.params.id);

  if (!deleteBooking) {
    return res.status(404).json({
      message: "Booking couldn't be found",
      statusCode: 404,
    });
  }
  const spot = await Spot.findOne({
    where: {
      ownerId: req.user.id,
    },
  });
  const booking = await Booking.findOne({
    where: {
      userId: req.user.id,
    },
  });

  if (
    (spot && spot.ownerId === req.user.id) ||
    (booking && booking.userId === req.user.id)
  ) {
    deleteBooking.destroy();
    return res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });
  }
  if (
    (spot && spot.ownerId === req.user.id) ||
    (booking && booking.userId === req.user.id)
  ) {
    return res.status(403).json({
      message: "Forbidden",
      statusCode: 403,
    });
  } else {
    return res.status(403).json({
      message: "Bookings that have been started can't be deleted",
      statusCode: 403,
    });
  }
});


// todo /:bookingId



module.exports = router;
