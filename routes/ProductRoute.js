const express = require("express");
const { check } = require("express-validator")
const { createUser, loginUser, getUserByToken, getUserById } = require("../controllers/CreateUser");
const { isAuthorized } = require("../middlewares/isAuthorized");
const route = express.Router();


route.get('/',(req,res)=>{
    res.send('he')
})

module.exports = route;