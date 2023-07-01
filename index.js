

const express = require("express")
require("dotenv").config();
const cors = require("cors")
const PORT = process.env.PORT ;
const userRoute = require("./routes/UserRoute");
const productRoute = require("./routes/ProductRoute")
const adRoute = require("./routes/AdsRoute")
const bidRoute = require("./routes/BidRoute")
const roomRoute = require("./routes/RoomRoute")
const auctionRoute = require("./routes/AuctionRoute")


const { createServer } = require('http');

const multer = require('multer');
// const socketio = require('./socket');
const socketio = require("socket.io")
const socketioHandler = require("./socket")
// const swaggerUi = require('swagger-ui-express');
// const swaggerDoc = require('./documentation/swaggerSetup');

const dbConnect = require("./config/dbConnect");
const app = express();



const server = createServer(app);
// const io = socketio.init(server);
const io = socketio(server);
// const adIo = socketio.initAdIo(server, '/socket/adpage');
const adIo = socketio(server,{path : '/socket/adpage'})
const upload = multer({ dest: 'uploads/' });

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
app.use("/api/ad",adRoute)
app.use("/api/bid",bidRoute)
app.use('/room', roomRoute);
app.use('/auction', auctionRoute);
// app.use('/upload', require('./routes/uploads'));

//The server logic goes here

// Usage of io 
io.on('connection', (socket) => {
  // console.log('### Socket IO client connected');
  socket.on('disconnect', (reason) => {
    // console.log('### Socket IO client disconnected');
  });
  socket.on('leaveHome', () => {
    socket.disconnect();
  });
});

//Usage of io and adIo
adIo.on('connect', (socket) => {
  // socket.join('testroom')
  socket.on('joinAd', ({ ad }) => {
    socket.join(ad.toString());
    // console.log(`User joined room ${ad}`);
  });
  socket.on('leaveAd', ({ ad }) => {
    socket.leave(ad.toString());
    // console.log(`Left room ${ad}`);
  });
  socket.on('disconnect', () => {
    // console.log('User has disconnect from ad');
  });
});

// Pass the io and adIo instances to the socketioHandler
socketioHandler.init(io, adIo);



// Connect DB and Initialize server
app.listen(PORT, async()=>{
    await dbConnect();
    console.log(`server is running on port ${PORT}`)
   
})
