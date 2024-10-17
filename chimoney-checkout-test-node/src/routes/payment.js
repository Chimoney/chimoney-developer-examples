const express = require('express');
const ChimoneyControlller = require('../controller/api');


const router = express.Router();

router.route('/initiate').post(ChimoneyControlller.initiatePayment)
router.route('/verify').post(ChimoneyControlller.verifyPayment)

module.exports = router 