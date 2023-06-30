const express = require('express');
const { body } = require('express-validator');


const { addBid, listBids } = require("../controllers/CreateBid")
const router = express.Router();

const { isAuthorized } = require('../middlewares/isAuthorized');

// @route   POST /bid/:adId?amount=<amount>
// @desc    Post a new ad
// @access  protected
router.post('/:adId?', isAuthorized, addBid);

// @route   GET /bid/:adId?option=<highest></highest>
// @desc    List of bids on an ad
// @access  protected
router.get('/:adId?', isAuthorized, listBids);

module.exports = router;
