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


// requireAuthorization function





//*GET /:spotId/bookings

//todo POST /:spotId/bookings



//* GET /current
// requires auth
// returns all the spots owned by the current user aka via owner id.
router.get("/current", requireAuth, async (req, res, next) => {
    const spots = await Spot.findAll({
        where: {
            'ownerId': req.user.id
        }
    })
return res.json(spots)
});

//* GET /:spotId
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


//todo PUT /:spotId
router.put = ('/id', requireAuth, requireAuthorization, async (req, res, next)=> {
  const spot = await Spot.findByPk(req.params.id);
  if(!spot){
    res.send("Spot couldn't be found")
    res.statusCode(404)
  }
  const {address, city, state, country, lat, lng, name, description, price } = req.body

  if(address !== undefined){
    spot.address = address
  }
  if(city !== undefined){
    spot.city = city
  }
  if(state !== undefined){
    spot.state = state
  }
  if(country !== undefined){
    spot.country = country
  }
  if(lat !== undefined){
    spot.lat = lat
  }
  if(lng !== undefined){
    spot.lng = lng
  }
  if(name !== undefined){
    spot.name = name
  }
  if(description !== undefined){
    spot.description = description
  }
  if(price !== undefined){
    spot.price = price
  }
await spot.save()
res.json(spot)

})


//todo POST /:spotId/images

// todo POST /:spotId/reviews



//! DELETE /:spotId
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

//* GET /
// Get all spots
router.get("/", async (req, res, next) => {
  let spots = await Spot.findAll()
    // Lazy loading attempt
    
    let spotsList = [];
    for (let currentSpot of spots){
      let spot = currentSpot.toJSON()
      console.log('wowowowowowowowow', spot)

    let averageRating = await Review.findAll({
      where: {
        spotId: spot.id,
        // attributes: need to find avg stars
        attributes: [
          [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']
        ], 
      }

    })


    let previewImage = await SpotImage.findAll({
      where: {
        spotId: spot.id, 
        preview: true
      }
    })

    if (previewImage) {
          spot.previewImage = previewImage.url;
      } else {
          spotsList.previewImage = null
      }




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


//todo POST /
// Creates and returns a new spot.
router.post('/', requireAuth, async (req, res, next)=> {
  const{ address, city, state, country, lat, lng, name, description, price} = req.body
  const ownerId = req.user.id
  const errors = []

  if(!address){
    errors.push("Street address is required")
  }
  if(!city){
    errors.push("City is required")
  }
  if(!state){
    errors.push("State is required")
  }
  if(!country){
    errors.push("Country is required")
  }
  if(!lat){
    errors.push("Latitude is not valid")
  }
  if(!lng){
    errors.push("Longitude is not valid")
  }
  if(!name){
    errors.push(("Name must be less than 50 characters"))
  }
  if(!description){
    errors.push("Description is required")
  }
  if(!price){
    errors.push("Price per day is required")
  }

  if(errors.length > 0){
    res.statusCode = 400
    res.json({
      message:"Validation Error",
      status: res.statusCode,
      errors: errors
    })
  }

const createSpot = await Spot.create({
  ownerId: ownerId,
  ...req.body
})

await createSpot.save()

const showNewSpot = await Spot.findOne({
  where:{
    "name": name
  }
})
res.statusCode = 201
req.json(showNewSpot)

})








// /api/spots/:spotId
// Updates and returns an existing spot.
// Require proper authorization: Spot must belong to the current user
// router.put('/:spotId', async (req, res)=> {

// })

// /api/spots/:spotId

module.exports = router;
