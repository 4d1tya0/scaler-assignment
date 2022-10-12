const Participant = require("../model/participant");

module.exports.getAllParticipants= (req, res) => {

  Participant.find()
    .then((participants) => {
      res.json(participants);
    })
    .catch((err) => console.log(err));
};


module.exports.addParticipants = async(req, res) => {
    if (typeof req.body == undefined) {
      res.json({
        status: "error",
        message: "data is undefined",
      });
    } else {
      
      try
      {
      
      let participant = await Participant.create({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
      });
    console.log("participant",participant)
    await participant.save();
    res.json(participant);
  
  }
  catch(err)
  {
      console.log("catch",err)
      res.json(err)
  }
         
    }
  };
  



//   //RESCHEDULE MEETING
  
//   module.exports.resheduleMeeting = async(req, res) => {
//     if (typeof req.body == undefined) {
//       res.json({
//         status: "error",
//         message: "data is undefined",
//       });
//     } else {
      
//       try
//       {
  
//       let meetings=await Meeting.find({}).exec();
//       let {sTime,eTime,participants}=req.body;
      
//       if(!checkAvailablity(sTime,eTime,meetings))
//       {
//        return res.json({
//           status: "error",
//           message: "Slot not available!",
//         });
//       }
      
//       let meeting = await Meeting.findByIdAndUpdate(req.params.id,{
//             startTime: sTime,
//             endTime: eTime,
//             participants: participants,
//           },{new:true});
  
//     res.json(meeting);
  
//   }
//   catch(err)
//   {
//       console.log("catch",err)
//       res.json(err)
//   }
         
//     }
//   };
  
//   module.exports.deleteMeeting = (req, res) => {
//     if (req.params.id == null) {
//       res.json({
//         status: "error",
//         message: "meeting id should be provided!",
//       });
//     } else {
//       console.log("ran");
//       Meeting.findOneAndDelete({
//         _id: req.params.id,
//       })
//         .select(["-_id"])
//         .then((meeting) => {
//           res.json(meeting);
//         })
//         .catch((err) => console.log(err));
//     }
//   };
  