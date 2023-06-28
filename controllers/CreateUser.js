


const createUser = asyncHandler(async (req, res) => {
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
        const findUser = await UserModel.findOne({ email })

        if (findUser && (await findUser.isPasswordMatched(password))) {

        
            res.json({
                _id: findUser._id,
                firstname: findUser.firstname,
                lastname: findUser.lastname,
                email: findUser.email,
                mobile: findUser.mobile,
                token: generateToken(findUser._id)
            })
        }
        else {
            throw new Error("Invalid credentials")
        }

    }
)

module.exports = {createUser,loginUser}