const express = require("express")
const route = express.Router();

route.get('/',(req,res)=>{
    res.send("helo")
})
route.post('/register',registerUser)
route.post('/login',loginUser)

module.exports = route;