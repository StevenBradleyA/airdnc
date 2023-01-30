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
  sequelize,
} = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Op } = require("sequelize");
const { ResultWithContext } = require("express-validator/src/chain");

//* GET /
// Get all spots
router.get("/", async (req, res, next) => {
  let query = {
    where: {},
    include: [],
  };
  const { minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;
  const errors = {};
  if (minLat) {
    if (minLat < -90) {
      errors.minLat = "Minimum latitude is invalid";
    } else {
      query.where.lat = { [Op.gte]: [minLat] };
    }
  }
  if (maxLat) {
    if (maxLat > 90) {
      errors.maxLat = "Maximum latitude is invalid";
    } else {
      if (query.where.lat) {
        query.where.lat = { ...query.where.lat, [Op.lte]: [maxLat] };
      } else {
        query.where.lat = { [Op.lte]: [maxLat] };
      }
    }
  }
  if (minLng) {
    if (minLng < -180) {
      errors.minLng = "Minimum longitude is invalid";
    } else {
      query.where.lng = { [Op.gte]: [minLng] };
    }
  }
  if (maxLng) {
    if (maxLng > 180) {
      errors.maxLng = "Maximum longitude is invalid";
    } else {
      if (query.where.lng) {
        query.where.lng = { ...query.where.lng, [Op.lte]: [maxLng] };
      } else {
        query.where.lng = { [Op.lte]: [maxLng] };
      }
    }
  }
  if (minPrice) {
    if (minPrice < 0) {
      errors.minPrice = "Minimum price must be greater than or equal to 0";
    } else {
      query.where.price = { [Op.gte]: [minPrice] };
    }
  }
  if (maxPrice) {
    if (maxPrice < 0) {
      errors.maxPrice = "Maximum price must be greater than or equal to 0";
    } else {
      if (query.where.price) {
        query.where.price = { ...query.where.price, [Op.lte]: [maxPrice] };
      } else {
        query.where.price = { [Op.gte]: [maxPrice] };
      }
    }
  }

  let { page, size } = req.query;

  if (!page) page = 1;
  if (!size) size = 20;

  page = Number(page);
  size = Number(size);
  if (page >= 1 && size >= 1 && page <= 10 && size <= 20) {
    query.limit = size;
    query.offset = size * (page - 1);
  }
  if (page < 1) {
    errors.page = "Page must be greater than or equal to 1";
  }
  if (size < 1) {
    errors.size = "Size must be greater than or equal to 1";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      message: "Validation Error",
      statusCode: 400,
      errors,
    });
  }

  const spots = await Spot.findAll(query);
  const spotData = [];
  for (const currentSpot of spots) {
    const spot = currentSpot.toJSON();
    const allReviews = await Review.findAll({
      attributes: ["stars"],
      where: {
        spotId: spot.id,
      },
    });

    // let totalScore = 0;
    // for(const currentReview of allReviews){
    //   // (currentReview)
    //   const review = currentReview.toJSON()
    //   totalScore += review.stars

    // }
    // (sumReview)
    const totalScore = allReviews.reduce((sumReview, currentReview) => {
      currentReview = currentReview.toJSON();
      sumReview += currentReview.stars;
      return sumReview;
    }, 0);
    const avgRating = totalScore / allReviews.length;

    spot.avgRating = avgRating;

    const spotImage = await SpotImage.findOne({
      attributes: ["url"],
      where: {
        spotId: spot.id,
        preview: true,
      },
    });
    if(spotImage){
   
      const url = spotImage.toJSON();

      const previewImage = url.url;
      spot.previewImage = previewImage;
    }else{
      spot.previewImage = "No preview image found"
    }


    spotData.push(spot);
  }

  // const Spots = {};
  // Spots.Spots = spots;
  // Spots.page = page;
  // Spots.size = size;
  // return res.json(Spots);
  return res.json({ Spots: spotData, page, size });
});

//* GET /current
// requires auth
// returns all the spots owned by the current user aka via owner id.
router.get("/current", requireAuth, async (req, res, next) => {
  const spots = await Spot.findAll({
    where: {
      ownerId: req.user.id,
    },
  });

  const spotData = [];
  for (const currentSpot of spots) {
    const spot = currentSpot.toJSON();
    const allReviews = await Review.findAll({
      attributes: ["stars"],
      where: {
        spotId: spot.id,
      },
    });

    const totalScore = allReviews.reduce((sumReview, currentReview) => {
      currentReview = currentReview.toJSON();
      sumReview += currentReview.stars;
      return sumReview;
    }, 0);
    const avgRating = totalScore / allReviews.length;

    spot.avgRating = avgRating;

    const spotImage = await SpotImage.findOne({
      attributes: ["url"],
      where: {
        spotId: spot.id,
        preview: true,
      },
    });
    // console.log(spotImage)
    if(spotImage){
      const url = spotImage.toJSON();
      const previewImage = url.url;
      spot.previewImage = previewImage;

    }else{
      spot.previewImage = "No preview image found"
    }


    spotData.push(spot);
  }

  return res.json({
    Spots: spotData,
  });
});

//* GET /:spotId
// Returns the details of a spot specified by its id.
router.get("/:id", async (req, res) => {
  const spot = await Spot.findByPk(req.params.id);
  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  const currentSpot = spot.toJSON();

  const allReviews = await Review.findAll({
    attributes: ["stars"],
    where: {
      spotId: spot.id,
    },
  });

  const totalScore = allReviews.reduce((sumReview, currentReview) => {
    currentReview = currentReview.toJSON();
    sumReview += currentReview.stars;
    return sumReview;
  }, 0);
  const avgRating = totalScore / allReviews.length;
  const numReviews = allReviews.length;
  currentSpot.numReviews = numReviews;
  currentSpot.avgStarRating = avgRating;

  const spotImages = await SpotImage.findAll({
    attributes: ["id", "url", "preview"],
    where: {
      spotId: spot.id,
    },
  });
  currentSpot.SpotImages = spotImages;

  const user = await User.findOne({
    attributes: ["id", "firstName", "lastName"],
    where: {
      id: spot.ownerId,
    },
  });
  currentSpot.Owner = user;

  return res.json(currentSpot);
});

//todo POST /

router.post("/", requireAuth, async (req, res, next) => {
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  const errors = {};

  if (!address) {
    errors.address = "Street address is required";
  }
  if (!city) {
    errors.city = "City is required";
  }
  if (!state) {
    errors.state = "State is required";
  }
  if (!country) {
    errors.country = "Country is required";
  }
  if (!lat) {
    errors.lat = "Latitude is not valid";
  }
  if (!lng) {
    errors.lng = "Longitude is not valid";
  }
  if (!name) {
    errors.name = "Name must be less than 50 characters";
  }
  if (!description) {
    errors.description = "Description is required";
  }
  if (!price) {
    errors.price = "Price per day is required";
  }

  if (
    errors.address ||
    errors.city ||
    errors.state ||
    errors.country ||
    errors.lat ||
    errors.lng ||
    errors.name ||
    errors.description ||
    errors.price
  ) {
    return res.status(400).json({
      message: "Validation Error",
      statusCode: 400,
      errors,
    });
  }

  const newSpot = await Spot.create({
    ownerId: req.user.id,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  });

  // (newSpot);
  return res.status(201).json(newSpot);
});

//todo POST /:spotId/images

router.post("/:id/images", requireAuth, async (req, res, next) => {
  const { url, preview } = req.body;
  const spot = await Spot.findByPk(req.params.id);
  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
  if (spot && spot.ownerId !== req.user.id) {
    return res.status(403).json({
      message: "Forbidden",
      statusCode: 403,
    });
  } else {
    const addImage = await SpotImage.create({
      spotId: spot.id,
      url,
      preview,
    });
    const addImageView = await SpotImage.findOne({
      attributes: ["id", "url", "preview"],
      where: addImage,
    });
    return res.json(addImageView);
  }
});

//todo PUT /:spotId
router.put("/:id", requireAuth, async (req, res, next) => {
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  const errors = {};

  if (!address) {
    errors.address = "Street address is required";
  }
  if (!city) {
    errors.city = "City is required";
  }
  if (!state) {
    errors.state = "State is required";
  }
  if (!country) {
    errors.country = "Country is required";
  }
  if (!lat) {
    errors.lat = "Latitude is not valid";
  }
  if (!lng) {
    errors.lng = "Longitude is not valid";
  }
  if (!name) {
    errors.name = "Name must be less than 50 characters";
  }
  if (!description) {
    errors.description = "Description is required";
  }
  if (!price) {
    errors.price = "Price per day is required";
  }

  if (
    errors.address ||
    errors.city ||
    errors.state ||
    errors.country ||
    errors.lat ||
    errors.lng ||
    errors.name ||
    errors.description ||
    errors.price
  ) {
    return res.status(400).json({
      message: "Validation Error",
      statusCode: 400,
      errors,
    });
  }

  const spot = await Spot.findByPk(req.params.id);
  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
  if (spot && spot.ownerId !== req.user.id) {
    return res.status(403).json({
      message: "Forbidden",
      statusCode: 403,
    });
  } else {
    spot.set({
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    });

    await spot.save();
    return res.json(spot);
  }
});

//! DELETE /:spotId
router.delete("/:id", requireAuth, async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.id);

  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
  if (spot && spot.ownerId !== req.user.id) {
    return res.status(403).json({
      message: "Forbidden",
      statusCode: 403,
    });
  } else {
    await spot.destroy();
    return res.json({
      message: "Successfull deleted",
      statusCode: 200,
    });
  }
});

//*GET /:spotId/reviews
// returns all the reviews that belong to a spot specified by id

router.get("/:id/reviews", async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.id);
  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
  const reviews = await Review.findAll({
    where: {
      spotId: req.params.id,
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
    const reviewImage = await ReviewImage.findAll({
      attributes: ["id", "url"],
      where: {
        id: review.id,
      },
    });

    review.ReviewImages = reviewImage;

    reviewData.push(review);
  }
  reviewData;
  return res.json({ Reviews: reviewData });
});

//todo POST /:spotId/reviews

router.post("/:id/reviews", requireAuth, async (req, res, next) => {
  const { review, stars } = req.body;
  const spot = await Spot.findByPk(req.params.id);
  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  const checkExistingReview = await Review.findAll({
    where: {
      spotId: req.params.id,
      userId: req.user.id,
    },
  });
  if (checkExistingReview.length > 0) {
    return res.status(403).json({
      message: "User already has a review for this spot",
      statusCode: 403,
    });
  }
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

  const newReview = await Review.create({
    userId: req.user.id,
    spotId: Number(req.params.id),
    review,
    stars,
  });

  return res.status(201).json(newReview);
});

//*GET /:spotId/bookings
router.get("/:id/bookings", requireAuth, async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.id);
  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  if (spot && spot.ownerId !== req.user.id) {
    const bookingInfo = {};
    const bookings = await Booking.findAll({
      attributes: ["spotId", "startDate", "endDate"],
      where: {
        spotId: req.params.id,
      },
    });
    bookingInfo.Bookings = bookings.map((currentBooking) => {
      const bookingObj = currentBooking.toJSON();
      const startDate = bookingObj.startDate;
      const endDate = bookingObj.endDate;

      bookingObj.startDate = getDateString(startDate);
      bookingObj.endDate = getDateString(endDate);
      return bookingObj;
    });
    return res.json(bookingInfo);
  }

  if (spot && spot.ownerId === req.user.id) {
    const bookingInfo = {};
    let bookings = await Booking.findAll({
      where: {
        spotId: req.params.id,
      },
    });

    const user = await User.findOne({
      attributes: ["id", "firstName", "lastName"],
      where: {
        id: req.user.id,
      },
    });

    bookingInfo.Bookings = bookings.map((currentBooking) => {
      const bookingObj = currentBooking.toJSON();
      const startDate = bookingObj.startDate;
      const endDate = bookingObj.endDate;

      bookingObj.startDate = getDateString(startDate);
      bookingObj.endDate = getDateString(endDate);
      bookingObj.User = user;
      return bookingObj;
    });
    return res.json(bookingInfo);
  }
});

//todo POST /:spotId/bookings

router.post("/:id/bookings", requireAuth, async (req, res, next) => {
  const { startDate, endDate } = req.body;
  const compareStartDate = new Date(startDate).getTime();
  const compareEndDate = new Date(endDate).getTime();

  if (compareStartDate >= compareEndDate) {
    const errors = {};
    errors.endDate = "endDate cannot be on or before startDate";
    return res.status(400).json({
      message: "Validation Error",
      statusCode: 400,
      errors,
    });
  }

  const bookings = await Booking.findAll({
    attributes: ["startDate", "endDate"],
    where: {
      spotId: req.params.id,
    },
  });
  for (const currentBooking of bookings) {
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
    if (errors.startDate || errors.endDate) {
      return res.status(403).json({
        message: "Sorry, this spot is already booked for the specified dates",
        statusCode: 403,
        errors,
      });
    }
  }

  const spot = await Spot.findByPk(req.params.id);
  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
  if (spot && spot.ownerId === req.user.id) {
    return res.status(404).json({
      message: "Forbidden",
      statusCode: 404,
    });
  } else {
    const newBooking = await Booking.create({
      spotId: Number(req.params.id),
      userId: req.user.id,
      startDate,
      endDate,
    });
    const createdBooking = newBooking.toJSON();
    createdBooking.startDate = startDate;
    createdBooking.endDate = endDate;

    return res.status(200).json(createdBooking);
  }
});

module.exports = router;
