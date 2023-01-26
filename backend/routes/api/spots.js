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
  sequelize
} = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Op } = require('sequelize');

// /api/spots/current
// requires auth
// returns all the spots owned by the current user aka via owner id.
// router.get("/current", requireAuth, async (req, res, next) => {
//     const spots = await Spot.findAll({
//         where: {
//             ownerId:
//         }
//     })
// return res.json(spots)
// });

//  /api/spots/:spotId
// Returns the details of a spot specified by its id.
router.get("/:id", async (req, res) => {
  const spot = await Spot.findByPk(req.params.id);
  include: [
    {
      model: SpotImage,
    },
    {
      model: User,
      as: "Owner",
    },
  ];

  return res.json(spot);
});

router.delete("/:id", requireAuth, async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.id);
  if (!spot) {
    let err = {};
    err.message = "Spot couldn't be found";
    err.status = 404;
    return next(err);
  }
  if (spot.ownerId !== req.user.id) {
    let err = {};
    err.message = "Forbidden";
    err.status = 403;
    return next(err);
  }
  await spot.destroy();
  return res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });
});

// /api/spots
// Get all spots
router.get("/", async (req, res, next) => {
  let spots = await Spot.findAll()
    // the eager way --------
    // include: [
    //   {
    //     model: Review,
    //   },
    //   {
    //     model: SpotImage,
    //   },
    // ],
    // Lazy loading attempt
    
    let spotsList = [];
    for (let currentSpot of spots){
      let spot = currentSpot.toJSON()
      console.log('wowowowowowowowow', spot)

    let averageRating = await Review.findAll({
      where: {
        spotId: spot.id,
        // attributes: need to find avg stars
        attributes: 
      }

    })


    let previewImage = await SpotImage.findAll({
      where: {
        spotId: spot.id, 
        preview: true
      }
    })


// if (previewImage.preview === true) {
  //     spotsList.previewImage = SpotImage.url;
  // } else {
  //     spotsList.previewImage = null
  // }







    spotsList.push(spot)
    }
    
    
    
    
    
    
    
    return res.json(spotsList);
  });

  


  
  // needs to be replaced with lazy loading loop with queries etc

  ////   spots.forEach((spot) => {

  //// const starSum = Review.sum('stars', {
  ////     where: {
  ////         spotId:spotsList.id
  ////     }
  //// })
  //// const starCount = Review.count({
  ////     where: {
  ////         spotId: spotsList.id
  ////     }
  //// })
  //// if (starCount > 0){
  ////     spotsList.avgRating = starSum / starCount
  //// }

  //// const spotImage =  SpotImage.findOne({
  ////     where: {
  ////         spotId: spotsList.id
  ////     }
  //// })
  //// spotsList.push(spot.toJSON());
  // });
  ////   return res.json({ Spots: spotsList });


// /api/spots
// Creates and returns a new spot.
// router.post('/', async (req, res)=> {

// })

// /api/spots/:spotId
// Updates and returns an existing spot.
// Require proper authorization: Spot must belong to the current user
// router.put('/:spotId', async (req, res)=> {

// })

// /api/spots/:spotId

module.exports = router;
