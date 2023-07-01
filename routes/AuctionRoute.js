const express = require('express');
const { body } = require('express-validator');
const startAuction = require('../controllers/CreateAuction');

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
