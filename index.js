

const express = require("express")
require("dotenv").config();
const cors = require("cors")
const PORT = process.env.PORT ;
const userRoute = require("./routes/UserRoute");
const productRoute = require("./routes/ProductRoute")
const dbConnect = require("./config/dbConnect");

const app = express();


//CORS
app.use(cors())
//Body parser
app.use(express.json())


//Default route
// app.get("/",(req,res,next)=>{
// res.send("server Running")
// })

//Routes
app.use("/api/user",userRoute)
app.use("/api/product",productRoute)


app.listen(PORT, async()=>{
    await dbConnect();
    console.log(`server is running on port ${PORT}`)
   
})
