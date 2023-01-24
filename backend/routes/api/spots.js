// backend/routes/api/spots.js
const express = require("express");
const router = express.Router();


const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


// /api/spots
// Get all spots
router.get('/', async (req, res) => {
    let spots = await Spot.findAll()
    return res.json(spots)
})







module.exports = router;
