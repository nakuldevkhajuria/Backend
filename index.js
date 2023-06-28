const express = require("express")
require("dotenv").config();
const cors = require("cors")
const userRoute = require("./routes/UserRoute");
const dbConnect = require("./config/dbConnect");

const app = express();
const PORT = process.env.PORT || 4000;


//Body parser
app.use(express.json())
//CORS
app.use(cors())

//Default route
app.get("/",(req,res,next)=>{
res.send("server Running")
})

//Routes
app.use("/api/user",userRoute)



app.listen(PORT, async()=>{
    await dbConnect();
    console.log(`server is running on port ${PORT}`)
   
})
