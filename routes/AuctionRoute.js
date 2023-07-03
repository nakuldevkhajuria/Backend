const express = require('express');
const { body } = require('express-validator');
// const startAuctionController = require('../controllers/CreateAuction');
// //this is the object which contains the routes


const {startAuction} = require("../controllers/CreateAuction")
//using name, exports it detructures the controllers. as we can use it as a variable in our code
const router = express.Router();

const { isAuthorized } = require('../middlewares/isAuthorized');

// @route   GET /auction/start/:adId
// @desc    Start auction
// @access  protected
router.get('/start/:adId', isAuthorized, startAuction);

// TODO:
// @route   POST /auction/end/:adId
// @desc    End auction
// @access  protected

module.exports = router;
