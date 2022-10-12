import moment from "moment";
import { useState,useEffect } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useHistory, useParams, useLocation } from "react-router-dom";
import Moment from "react-moment";
import { API_URL } from "./config/config.js";

const RescheduleInterview = () => {
  const { uuid } = useParams();
  console.log(uuid);
  const location=useLocation();

  let fetchParticipants=()=>{
    let url=`${API_URL}/participants`
    fetch(url)
    .then((response) => response.json())
    .then((data) =>{ 
      console.log(data);
      setCandidateData(data)
    });
  }

useEffect(()=>{

  fetchParticipants();

},[])

  const animatedComponents = makeAnimated();
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [candidates, setCandidates] = useState([]);
  const [candidateData, setCandidateData] = useState([]);

  const [interviewers, setInterviewers] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();

  const getOptions = (data) => {
    console.log(data);
    const options = [];
    for (let d of data) {
      options.push({ label: d.email, value: d.email });
    }
    return options;
  };

  const handleSubmit = (e) => {
    setIsPending(true);
    e.preventDefault();
    const participants = [];
    for (let interviewer of interviewers) {
      participants.push(interviewer.value);
    }
    for (let candidate of candidates) {
      participants.push(candidate.value);
    }
    const stime = moment(
      `${date} ${startTime}`,
      "YYYY-MM-DD HH:mm:ss"
    ).format();
    const etime = moment(`${date} ${endTime}`, "YYYY-MM-DD HH:mm:ss").format();
    console.log("this is parti", participants);
    const interview = {
      sTime: stime,
      eTime: etime,
      participants: participants,
    };
    console.log(interview);

    fetch(`${API_URL}/meetings/reshedule/${uuid}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(interview),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.text().then((text) => {
          throw new Error(text);
        });
      })
      .then((data) => {
        console.log(data);
        setIsPending(false);
        console.log("Successfully updated interview");
        alert(
          "Successfully Rescheduled Interview!"
        );
        history.push("/");
      })
      .catch((err) => {
        const data = JSON.parse(err.message);
        alert(data.message);
        setIsPending(false);
        console.log(err);
      });
  };

  return (
    <div className="schedule">
      <h1>Reschedule interview</h1>
      <h2>id: {uuid}</h2>
      {
      (
        <div>
          <div className="old-details">
            <h3>Current Details</h3>
            <h4>
              Date:{" "}
              <Moment format="DD-MM-YYYY">{location.state.startTime}</Moment>
            </h4>
            <h4>
              Timings:{" "}
              <Moment format="hh:mm A">{location.state.startTime}</Moment> -{" "}
              <Moment format="hh:mm A">{location.state.endTime}</Moment>
            </h4>
            <h4>Participants</h4>
            <ul>
              {location.state.participants.map((participant, idx) => (
                <li>{participant}</li>
              ))}
            </ul>
          </div>
          <form onSubmit={handleSubmit}>
            <label>Reschedule Date : </label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <label>Reschedule Start Time : </label>
            <input
              type="time"
              value={startTime}
              required
              onChange={(e) => setStartTime(e.target.value)}
            />
            <label>Rescheudle End Time : </label>
            <input
              type="time"
              value={endTime}
              required
              onChange={(e) => setEndTime(e.target.value)}
            />
            <label>Select Candidates : </label>
            <Select
              isMulti
              closeMenuOnSelect={false}
              components={animatedComponents}
              name="candidates"
              options={getOptions(candidateData)}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={(selectedOption) => {
                setCandidates(selectedOption);
                console.log("candidates selected", selectedOption);
              }}
            />
            {!isPending && <button>Rechedule Interview</button>}
            {isPending && <button disabled>Rescheduling Interview...</button>}
          </form>
        </div>
      )}
    </div>
  );
};

export default RescheduleInterview;
