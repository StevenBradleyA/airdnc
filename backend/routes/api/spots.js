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

// /api/spots/current
// requires auth
// returns all the spots owned by the current user aka via owner id.
// router.get("/current", requireAuth, async (req, res, next) => {


// });


//  /api/spots/:spotId
// Returns the details of a spot specified by its id.
// router.get('/:spotId', async (req, res)=> {

// })


router.delete('/:id', requireAuth, async (req, res, next)=>{
    const spot = await Spot.findByPk(req.params.id)
    if(!spot){
        let err = {}
        err.message = "Spot couldn't be found"
        err.status = 404
        return next(err)
    }
    if(spot.ownerId !== req.user.id){
        let err = {}
        err.message = "Forbidden"
        err.status = 403
        return next(err)
    }
    await spot.destroy()
    return res.json({
        message: "Successfully deleted",
        statusCode: 200
    })


})




// /api/spots
// Get all spots
router.get("/", async (req, res, next) => {
  let spots = await Spot.findAll({
    include: [
      {
        model: Review,
      },
      {
        model: SpotImage,
      },
    ],
  });
  // needs to be replaced with lazy loading loop with queries etc

  //   let spotList = [];
  //   spots.forEach((spot) => {

  // const starSum = Review.sum('stars', {
  //     where: {
  //         spotId:spotList.id
  //     }
  // })
  // const starCount = Review.count({
  //     where: {
  //         spotId: spotList.id
  //     }
  // })
  // if (starCount > 0){
  //     spotList.avgRating = starSum / starCount
  // }

  // const spotImage =  SpotImage.findOne({
  //     where: {
  //         spotId: spotList.id
  //     }
  // })
  // if (SpotImage.preview === true) {
  //     spotList.previewImage = SpotImage.url;
  // } else {
  //     spotList.previewImage = null
  // }
  // spotList.push(spot.toJSON());
  // });
  //   return res.json({ Spots: spotList });

  return res.json(spots);
});




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
