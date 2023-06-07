const express = require("express");
const router = express.Router();

//* GET /maps

router.get("/", (req, res) => {
  const mapsSecret = process.env.MAPS_API_SECRET;
  console.log(mapsSecret);
  return res.json({ mapsSecret });
});

module.exports = router;
