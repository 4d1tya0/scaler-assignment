const mongoose = require("mongoose");
const schema = mongoose.Schema;


const participantSchema = new schema({
  name: {
    type: String,
    required: true,
  },
  email:{
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("participant", participantSchema);
