
const RoomModel = require('../models/RoomModel');

// @route   POST /room/join/:roomId
// @desc    Add user to a room
exports.joinRoom = async (req, res, next) => {
  const { userData } = req.userData;
  const { roomId } = req.params;

  try {
    let room = await RoomModel.findById(roomId);
    // Check if user already in room
    const userInRoom = room.users.find((roomUser) => {
      return roomUser._id == userData.id ? true : false;
    });
    if (userInRoom) {
      return res.status(400).json({ errors: [{ msg: 'Already joined' }] });
    }
    room.users.push(userData.id);
    room.populate('users', { password: 0 });
    room = await room.save();
    res.status(200).json({ msg: 'Successfully joined', room });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

// @route   GET /room/:roomId
// @desc    Get room details
exports.getRoom = async (req, res, next) => {
  const { roomId } = req.params;

  try {
    let room = await Room.findById(roomId).populate('users', { password: 0 });
    res.status(200).json(room);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};
