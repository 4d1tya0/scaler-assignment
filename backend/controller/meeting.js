const meeting = require("../model/meeting");
const Meeting = require("../model/meeting");
const { checkAvailablity } = require("../utils/utils");

module.exports.getAllMeetings= (req, res) => {
  // const sort = req.query.sort == "desc" ? -1 : 1;

  Meeting.find()
    .sort({ startTime: 1 })
    .then((meetings) => {
      res.json(meetings);
    })
    .catch((err) => console.log(err));
};

// module.exports.getProduct = (req, res) => {
//   const id = req.params.id;

//   Product.findOne({
//     id,
//   })
//     // .select(["-_id"])
//     .then((product) => {
//       res.json(product);
//     })
//     .catch((err) => console.log(err));
// };

//SCHEDULE MEETING


module.exports.sheduleMeeting = async(req, res) => {
  if (typeof req.body == undefined) {
    res.json({
      status: "error",
      message: "data is undefined",
    });
  } else {
    
    try
    {

      console.log(req.body);
    let meetings=await Meeting.find({}).exec();
    // console.log("meetings",meetings);
    let {sTime,eTime,participants}=req.body;
    // console.log(req.body)
    
    if(!checkAvailablity(sTime,eTime,meetings))
    {
     return res.json({
        status: "error",
        message: "Slot not available!",
      });
    }
    
    let meeting = await Meeting.create({
      startTime: sTime,
      endTime: eTime,
      participants: participants,
    });
  console.log("meeting",meeting)
  await meeting.save();
  res.json(meeting);

}
catch(err)
{
    console.log("catch",err)
    res.json(err)
}
       
  }
};

//RESCHEDULE MEETING

module.exports.resheduleMeeting = async(req, res) => {
  if (typeof req.body == undefined) {
    res.json({
      status: "error",
      message: "data is undefined",
    });
  } else {
    
    try
    {

    let meetings=await Meeting.find({}).exec();
    let {sTime,eTime,participants}=req.body;
    
    if(!checkAvailablity(sTime,eTime,meetings))
    {
     return res.json({
        status: "error",
        message: "Slot not available!",
      });
    }
    
    let meeting = await Meeting.findByIdAndUpdate(req.params.id,{
          startTime: sTime,
          endTime: eTime,
          participants: participants,
        },{new:true});

  res.json(meeting);

}
catch(err)
{
    console.log("catch",err)
    res.json(err)
}
       
  }
};

module.exports.deleteMeeting = (req, res) => {
  if (req.params.id == null) {
    res.json({
      status: "error",
      message: "meeting id should be provided!",
    });
  } else {
    console.log("ran");
    Meeting.findOneAndDelete({
      _id: req.params.id,
    })
      .select(["-_id"])
      .then((meeting) => {
        res.json(meeting);
      })
      .catch((err) => console.log(err));
  }
};
