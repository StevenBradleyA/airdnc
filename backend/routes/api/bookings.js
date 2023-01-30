// backend/routes/api/spots.js
const express = require("express");
const router = express.Router();

const {
  setTokenCookie,
  requireAuth,
  getDateString,
} = require("../../utils/auth");
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

  return res.json({ Bookings: bookingData });
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
  const startDateObj = deleteBooking.toJSON().startDate;
  const endDateObj = deleteBooking.toJSON().endDate;

  const compareStartDate = startDateObj.getTime();
  const compareEndDate = endDateObj.getTime();

  
  if (Date.now() > compareStartDate && Date.now() < compareEndDate) {
    return res.status(403).json({
      message: "Bookings that have been started can't be deleted",
      statusCode: 403,
    });
  }

 
  const spot = await Spot.findOne({
    where: {
      ownerId: req.user.id,
    },
  });

  if (
    (spot && spot.ownerId !== req.user.id) ||
    (deleteBooking && deleteBooking.userId !== req.user.id)
  ) {
    return res.status(403).json({
      message: "Forbidden",
      statusCode: 403,
    });
  }

  if (
    (spot && spot.ownerId === req.user.id) ||
    (deleteBooking && deleteBooking.userId === req.user.id)
  ) {
    deleteBooking.destroy();
    return res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });
  }
});

// todo /:bookingId
router.put("/:id", requireAuth, async (req, res, next) => {
  const { startDate, endDate } = req.body;
  const booking = await Booking.findByPk(req.params.id);
  if (booking && booking.userId !== req.user.id) {
    return res.status(404).json({
      message: "Forbidden",
      statusCode: 404,
    });
  }
  if (!booking) {
    return res.status(404).json({
      message: "Booking couldn't be found",
      statusCode: 404,
    });
  }

  const compareStartDate = new Date(startDate).getTime();
  const compareEndDate = new Date(endDate).getTime();

  if (compareStartDate > compareEndDate) {
    const errors = {};
    errors.endDate = "endDate cannot come before startDate";
    return res.status(400).json({
      message: "Validation Error",
      statusCode: 400,
      errors,
    });
  }

  const findBookings = await Booking.findAll({
    attributes: ["startDate", "endDate"],
    where: {
      spotId: req.params.id,
    },
  });
  for (const currentBooking of findBookings) {
    const bookingObj = currentBooking.toJSON();
    const testExistingStartDate = bookingObj.startDate.getTime();
    const testExistingEndDate = bookingObj.endDate.getTime();
    const errors = {};
    if (compareStartDate === testExistingStartDate) {
      errors.startDate = "Start date conflicts with an existing booking";
    }
    if (compareEndDate === testExistingEndDate) {
      errors.endDate = "End date conflicts with an existing booking";
    }
    if (Date.now() > testExistingEndDate) {
      return res.status(403).json({
        message: "Past bookings can't be modified",
        statusCode: 403,
      });
    }
    if (errors.startDate || errors.endDate) {
      return res.status(403).json({
        message: "Sorry, this spot is already booked for the specified dates",
        statusCode: 403,
        errors,
      });
    }
  }

  if (booking && booking.userId === req.user.id) {
    booking.set({
      startDate,
      endDate,
    });

    await booking.save();
    const bookingObj = booking.toJSON();
    bookingObj.startDate = getDateString(bookingObj.startDate);
    bookingObj.endDate = getDateString(bookingObj.endDate);

    return res.json(bookingObj);
  }
});

module.exports = router;
