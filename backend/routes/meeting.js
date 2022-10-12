const express = require("express");
const router = express.Router();
const meeting = require("../controller/meeting");

router.get("/", meeting.getAllMeetings);
router.post("/", meeting.sheduleMeeting);
router.put("/reshedule/:id", meeting.resheduleMeeting);
router.delete("/:id", meeting.deleteMeeting);

module.exports = router;
