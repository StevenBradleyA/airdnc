// backend/routes/api/spots.js
const express = require("express");
const router = express.Router();


const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Booking, Review, ReviewImage, SpotImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


// /api/spots
// Get all spots
// router.get('/', async (req, res) => {
//     let spots = await Spot.findAll({
//         include: [{model: Review, as:"avgRating"}, {model: ReviewImage, as: "previewImage"}]

        
//         // add avg stars for all reviews for a spotid
//         // add preview Image 

//     })
//     return res.json(spots)
// })
// need an aggregate function to grab the average of the rating values for all of the reviews related to a particular spot id


// /api/spots/current
// requires Auth
// Returns all the spots owned (created) by the current user.
// router.get('/current', async (req, res)=> {

// })



//  /api/spots/:spotId
// Returns the details of a spot specified by its id.
// router.get('/:spotId', async (req, res)=> {

// })


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
