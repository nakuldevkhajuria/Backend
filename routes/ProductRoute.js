const express = require("express");
const { check } = require("express-validator")

const { isAuthorized } = require("../middlewares/isAuthorized");
const { purchasedProducts, postedProducts } = require("../controllers/CreateProduct");
const route = express.Router();

// @route   GET /user/product/purchased
// @desc    Get product purchased by user
// @access  protected
route.get('/purchased',isAuthorized,
purchasedProducts
)

// @route   GET /user/product/posted
// @desc    Get product ads posted by user
// @access  protected
route.get('/posted',isAuthorized,
postedProducts
)


module.exports = route;