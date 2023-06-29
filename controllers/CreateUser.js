
const asyncHandler = require("express-async-handler")
const {validationResult} = require("express-validator")
const UserModel = require("../models/UserModel");
const generateToken = require("../config/jwt");



const getUserByToken = asyncHandler( async (req,res)=>{
    try {

        const { _id } = req.userData;
       
        
        // validateMongodbId(id);
        //validating using Mongodb isValid method
        //checks if the id is hexadecimal 24 characters

        const user = await UserModel.findById(_id)

        if (user) { res.json(user); }
        else { res.json(message = 'This id is not present in the database') }

    }
     catch (error) {
        throw new Error(error)
    }
})


const getUserById = asyncHandler( async (req,res)=>{
    try {

       const { id } = req.params; 
       
        
        // validateMongodbId(id);
        //validating using Mongodb isValid method
        //checks if the id is hexadecimal 24 characters

        const user = await UserModel.findById(id)

        if (user) { res.json(user); }
        else { res.json(message = 'This id is not present in the database') }

    }
     catch (error) {
        throw new Error(error)
    }
})

const createUser = asyncHandler(async (req, res) => {

    // const errors = validationResult(req);

    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }


    const email = req.body.email;
    const findUser = await UserModel.findOne({ email: email })

    if (!findUser) {
        //create a new user
        const newUser = await UserModel.create(req.body)
        res.send(newUser)
        //and send as json
    }
    else {
        throw new Error('User Already Exists')
    }
})
const loginUser = asyncHandler(
    async (req, res) => {
        const { email, password } = req.body;
        //check if user exisits or not
        const findUser = await UserModel.findOne({ email:email })
console.log(findUser)
        if (findUser && (await findUser.isPasswordCorrect(password))) {

        
            res.json({
                _id: findUser._id,
                email: findUser.email,
                phone:findUser.phone,
                address:findUser.address,
                
                token: generateToken(findUser._id)
            })
        }
        else {
            throw new Error("Invalid credentials")
        }

    }
)

module.exports = {createUser,loginUser,getUserByToken,getUserById}