
const asyncHandler = require("express-async-handler")
const {validationResult} = require("express-validator")
const UserModel = require("../models/UserModel");
const generateToken = require("../config/jwt");


const purchasedProducts = asyncHandler(
    async function(req,res){
        const { _id } = req.userData;

        const user = await UserModel.findById(_id);

        if(!user){res.send(message='this user is not present in db')}

        await user.populate('purchasedProducts');
        // populate with the corresponding documents from the referenced collection ('ad' collection in this case)
        
        res.status(200).json(user.purchasedProducts);
   
    }
)

module.exports= {purchasedProducts}