const express = require("express");
const { check } = require("express-validator")
const { createUser, loginUser, getUserByToken, getUserById } = require("../controllers/CreateUser");
const { isAuthorized } = require("../middlewares/isAuthorized");
const route = express.Router();



// @route   GET /
// @desc    Get logged in user from token
// @access  protected
route.get('/', isAuthorized, getUserByToken)


// @route   GET /
// @desc    Get user by id
// @access  protected
route.get('/:id',isAuthorized,getUserById)

//@route POST /
//@desc Register user
//@access public
route.post('/register',
    [check('username',"Invalid username").trim().not().isEmpty(),
        check('email', "Invalid credentials").isEmail().trim(),
        check('password',"enter valid password").isLength({ min: 6 }).trim()
    ],
    createUser)


// @route   POST /
// @desc    Login with credentials
// @access  public
route.post('/login',
    [
        check('email').isEmail(),
        check('password').isLength({ min: 6 })
    ],
    loginUser)







module.exports = route;