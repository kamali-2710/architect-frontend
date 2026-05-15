import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import "../styles/Mytask.css";

const Mytask = () => {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [selectedRequirement, setSelectedRequirement] = useState("");
  const [showModal, setShowModal] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("user"));

  const loadTasks = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/requirements");
      const data = await res.json();

      const myTasks = data.filter(
        (item) => item.architect === currentUser.username
      );

      setTasks(myTasks);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const openModal = (req) => {
    setSelectedRequirement(req);
    setShowModal(true);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "COMPLETED":
        return "completed";
      case "REJECTED":
        return "rejected";
      case "ASSIGNED":
        return "assigned";
      case "UNDER_REVIEW":
        return "under_review";
      default:
        return "";
    }
  };

  return (
    <div className="mytask-page">
      <h2 className="task-title">My Tasks</h2>

      <div className="task-grid">
        {tasks.length > 0 ? (
          tasks.map((item) => (
            <Card
              key={item._id}
              className={`task-detail ${item.status === "COMPLETED"
                ? "completed-task"
                : item.status === "REJECTED"
                ? "rejected-task"
                : item.status === "ASSIGNED"
                ? "assigned-task"
                : item.status === "UNDER_REVIEW"
                ? "under_review-task"
                : ""
              }`}
            >
              {/* STATUS BADGE */}
              <span className={`task-badge ${getStatusClass(item.status)}`}>
                {item.status}
              </span>

              {/* IMAGE */}
              <div className="task-img-box">
                <img
                  src={
                    item.image
                      ? `http://localhost:5000/${item.image}`
                      : "/image.jpg"
                  }
                  alt="task"
                />
              </div>

              {/* DETAILS */}
              <h3>{item.project}</h3>

              <p><b>Client :</b> {item.clientName}</p>
              <p><b>Location :</b> {item.location}</p>
              <p><b>Type :</b> {item.type}</p>
              <p><b>Status :</b> {item.status}</p>

              {/* REQUIREMENT */}
              <div className="requirement-box">
                <h4>Requirement</h4>

                <p
                  className={
                    item.status === "REJECTED" ? "rejected-text" : ""
                  }
                >
                  {item.requirement?.length > 120
                    ? item.requirement.slice(0, 120) + "..."
                    : item.requirement}
                </p>

                {item.requirement?.length > 120 && (
                  <button
                    className="view-more-btn"
                    onClick={() => openModal(item.requirement)}
                  >
                    View More
                  </button>
                )}
              </div>

              {/* BUTTON */}
              {item.status !== "COMPLETED" && (
                <button
                  className="upload-btn"
                  onClick={() => navigate(`/upload?id=${item._id}`)}
                >
                  {item.status === "REJECTED"
                    ? "Rework & Resend"
                    : "Upload Work"}
                </button>
              )}

              {/* REJECT MESSAGE */}
              {item.status === "REJECTED" && (
                <p className="reject-msg">
                  ❌ Rejected by Admin and Needs Rework
                </p>
              )}
            </Card>
          ))
        ) : (
          <div className="no-task">No Tasks Assigned</div>
        )}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div
            className="modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Full Requirement</h2>
            <p>{selectedRequirement}</p>

            <button
              className="modal-close-btn"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mytask;