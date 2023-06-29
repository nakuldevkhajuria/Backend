const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const UserSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true,
        },
        phone:{
            type:Number,
            required:false,
        },
        address:{
            type:String,
            required:false,
        },
        purchasedProducts:[
            {
                type:mongoose.Types.ObjectId,
                ref:'ad'
            }
        ],
        postedAds:[
            {
                type:mongoose.Types.ObjectId,
                ref:'ad',
            },
        ],
        bids:[
            {
                type:mongoose.Types.ObjectId,
                ref:'ad'
            }
        ]
    }
)

UserSchema.pre("save",async function(next){
    let salt = 10;
     this.password =  await bcrypt.hash(this.password,salt)
    next();
})

UserSchema.methods.isPasswordCorrect = async function(enteredPassword){
return bcrypt.compare(enteredPassword,this.password)
}

module.exports = mongoose.model("user",UserSchema)