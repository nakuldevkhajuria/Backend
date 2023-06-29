const express = require("express");
const { check } = require("express-validator")

const { isAuthorized } = require("../middlewares/isAuthorized");
const { purchasedProducts } = require("../controllers/CreateProduct");
const route = express.Router();


route.get('/purchased',isAuthorized,
purchasedProducts
)

module.exports = route;