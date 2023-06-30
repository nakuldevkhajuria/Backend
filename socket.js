
let io;
let adIo;


exports.init = (mainIo,mainAdIo)=>{
  io = mainIo;
  adIo = mainAdIo;
}

exports.getIo = () => {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
};

exports.getAdIo = () => {
  if (!adIo) {
    throw new Error('Socket.io not initialized');
  }
  return adIo;
};
