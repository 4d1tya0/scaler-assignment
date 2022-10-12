module.exports.checkAvailablity=(sTime,eTime,meetings)=>{

    for(let meeting of meetings)
    {   
        console.log(new Date(eTime)  , new Date(sTime) );
        if(!(new Date(eTime) < new Date(meeting.startTime) || new Date(sTime) > new Date(meeting.endTime)))
        return false;
    }
return true;
}