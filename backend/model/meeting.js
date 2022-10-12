const mongoose = require("mongoose");
const schema = mongoose.Schema;


const meetingSchema = new schema({
  startTime: {
    type: Date,
    required: true,
  },
  endTime:{
    type: Date,
    required: true,
  },
  participants: [String],
});

module.exports = mongoose.model("meeting", meetingSchema);
