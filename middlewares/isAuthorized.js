const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

const isAuthorized = asyncHandler(
    async function(req,res,next){
        try {
         
            if(req?.headers?.authorization?.startsWith("Bearer")){
                token = req.headers.authorization?.split(" ")[1];

                let decoder = jwt.verify(token,process.env.SECRET_KEY)

                if(decoder){
                    const user = await UserModel.findById(decoder?.id)
                    req.userData = user;
              
                    next()
                }
                else{
                    res.json( message = "given token is wrong")
                }
              
            }
           
        } 
        catch (error) {
            throw new Error(error);
        }
    }
)

module.exports = {isAuthorized}