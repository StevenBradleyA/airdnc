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
  sequelize,
} = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Op } = require("sequelize");
const { consolePog } = require("../../utils/custom");

//* GET /
// Get all spots
router.get("/", async (req, res, next) => {
  const spots = await Spot.findAll();
  consolePog(spots);
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
    //   // consolePog(currentReview)
    //   const review = currentReview.toJSON()
    //   totalScore += review.stars

    // }
    // consolePog(sumReview)
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
    const url = spotImage.toJSON();

    const previewImage = url.url;
    spot.previewImage = previewImage;

    spotData.push(spot);
  }

  return res.json(spotData);
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

    const url = spotImage.toJSON();

    const previewImage = url.url;
    spot.previewImage = previewImage;

    spotData.push(spot);
  }

  return res.json(spotData);
});

//* GET /:spotId
// Returns the details of a spot specified by its id.
router.get("/:id", async (req, res) => {
  const spot = await Spot.findByPk(req.params.id);

  const spotData = [];

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
  currentSpot.avgRating = avgRating;

  const spotImages = await SpotImage.findAll({
    attributes: ["id", "url", "preview"],
    where: {
      spotId: spot.id,
    },
  });
  currentSpot.spotImages = spotImages;

  const user = await User.findOne({
    attributes: ["id", "firstName", "lastName"],
    where: {
      id: spot.ownerId,
    },
  });
  currentSpot.Owner = user;

  spotData.push(currentSpot);

  return res.json(spotData);
});

//todo POST /

router.post("/", requireAuth, async (req, res, next) => {
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  const errors = [];

  if (!address) {
    errors.push("Street address is required");
  }
  if (!city) {
    errors.push("City is required");
  }
  if (!state) {
    errors.push("State is required");
  }
  if (!country) {
    errors.push("Country is required");
  }
  if (!lat) {
    errors.push("Latitude is not valid");
  }
  if (!lng) {
    errors.push("Longitude is not valid");
  }
  if (!name) {
    errors.push("Name must be less than 50 characters");
  }
  if (!description) {
    errors.push("Description is required");
  }
  if (!price) {
    errors.push("Price per day is required");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      message: "Validation Error",
      statusCode: 400,
      errors: errors,
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

  // consolePog(newSpot);
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
    consolePog(spot)
    res.json(spot);
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

//*GET /:spotId/bookings
// if you are the owner you should see Bookings with minor info
// if you are not the owner you should see bookings with more info
// const checkNotHomeOwner = async (req, res, next)=> {
//   let spot = await Spot.findByPk(req.params.spotId)
//   if(spot.ownerId === req.user.id){

//   }

// }

// router.get('/:id/bookings', requireAuth, homeless, ownerAuthorization, async(req, res, next) => {

// if(ownerAuthorization){

// }

//   if(!ownerAuthorization){
//     let bookings = await Booking.findAll({
//       attributes: ["spotId", "startDate", "endDate"]
//     })
//     return res.json({bookings})

//   };

// })

//todo POST /:spotId/bookings
// spot cant belong to current User

//todo PUT /:spotId
// router.put =
//   ("/id",
//   requireAuth,
//   ownerAuthorization,
//   homeless,
//   async (req, res, next) => {
//     const spot = await Spot.findByPk(req.params.id);

//     const {
//       address,
//       city,
//       state,
//       country,
//       lat,
//       lng,
//       name,
//       description,
//       price,
//     } = req.body;

//     if (address !== undefined) {
//       spot.address = address;
//     }
//     if (city !== undefined) {
//       spot.city = city;
//     }
//     if (state !== undefined) {
//       spot.state = state;
//     }
//     if (country !== undefined) {
//       spot.country = country;
//     }
//     if (lat !== undefined) {
//       spot.lat = lat;
//     }
//     if (lng !== undefined) {
//       spot.lng = lng;
//     }
//     if (name !== undefined) {
//       spot.name = name;
//     }
//     if (description !== undefined) {
//       spot.description = description;
//     }
//     if (price !== undefined) {
//       spot.price = price;
//     }
//     await spot.save();
//     res.json(spot);
//   });

module.exports = router;
