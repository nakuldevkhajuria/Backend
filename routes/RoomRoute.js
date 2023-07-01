const express = require('express');
const { body } = require('express-validator');

const {joinRoom,getRoom} = require("../controllers/CreateRoom")
const router = express.Router();


const { isAuthorized } = require('../middlewares/isAuthorized');

// @route   POST /room/join/:roomId
// @desc    Add user to a room
// @access  protected
router.post('/join/:roomId', isAuthorized, joinRoom);

// @route   GET /room/:roomId
// @desc    Get room details
// @access  protected
router.get('/:roomId', isAuthorized, getRoom);

module.exports = router;
