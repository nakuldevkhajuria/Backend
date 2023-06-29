const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const UserSchema = new mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true,
        }
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

module.exports = mongoose.model("users",UserSchema)