const express = require('express');
const paymentRoute = require('./payment');


const router = express.Router();

router.use('/payment', paymentRoute);

module.exports = router 