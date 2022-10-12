import Moment from "react-moment";
import { Link } from "react-router-dom";
import { API_URL } from "./config/config.js";

const InterviewList = ({ interviews, title }) => {
  const handleDelete = (uuid) => {
    fetch(`${API_URL}/meetings/${uuid}`, {
      method: "DELETE",
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
        console.log("Successfully deleted interview");
        alert("Successfully deleted Interview");
        window.location.reload();
      })
      .catch((err) => {
        const data = JSON.parse(err.message);
        alert(data.message);
        console.log(err);
      });
  };

  return (
    <div className="interview-list">
      <h1>{title}</h1>
      {interviews.map((interview, idx) => (
        <div className="interview-preview" key={interview._id}>
          <Link
            to={{
              pathname: `/interview/${interview._id}`,
            }}
            style={{ textDecoration: "none" }}
          >
            <div>
              <h2>Interview {idx + 1}</h2>
              <p>
                Date: <Moment format="DD-MM-YYYY">{interview.endTime}</Moment>
              </p>
              <p>
                StartTime:{" "}
                <Moment format="hh:mm A">{interview.startTime}</Moment>
              </p>
              <p>
                EndTime: <Moment format="hh:mm A">{interview.endTime}</Moment>
              </p>
            </div>
          </Link>
          <Link
            to={{
              pathname: `/reschedule/${interview._id}`,
              state:interview
            }}
          >
            <button className="green-btn">Edit</button>
          </Link>
          <button
            className="red-btn"
            onClick={() => {
              handleDelete(interview._id);
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default InterviewList;
