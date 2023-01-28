// backend/routes/api/spots.js
const express = require("express");
const router = express.Router();


const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Booking, Review, ReviewImage, SpotImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


//* GET /current






module.exports = router;
