// backend/routes/api/index.js
// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const userRouter = require('./users.js');
const spotRouter = require('./spots.js');
const bookingRouter = require('./bookings.js');
const reviewRouter = require('./reviews.js');
const reviewImageRouter = require('./review-images.js');
const spotImageRouter = require('./spot-images.js');
const mapRouter = require('./maps.js');

const { restoreUser } = require('../../utils/auth.js');

// Connect restoreUser middleware to the API router
// If current user session is valid, set req.user to the user in the database
// If current user session is not valid, set req.user to null
router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', userRouter);

router.use('/spots', spotRouter);

router.use('/bookings', bookingRouter);

router.use('/reviews', reviewRouter);

router.use('/review-images', reviewImageRouter);

router.use('/spot-images', spotImageRouter);

router.use('/maps', mapRouter);

module.exports = router;
