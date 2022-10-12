const express = require("express");
const router = express.Router();
const participant = require("../controller/participant");

router.get("/", participant.getAllParticipants);
router.post("/", participant.addParticipants);
// router.put("/reshedule/:id", meeting.resheduleMeeting);
// router.delete("/:id", meeting.deleteMeeting);

module.exports = router;
