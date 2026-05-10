import React, { useEffect, useState } from "react";

import "../styles/AssignProject.css";
import "../styles/Card.css";

import Card from "../components/Card";

const AssignArchitect = () => {
  const [projects, setProjects] = useState([]);
  const [architects, setArchitects] = useState([]);
  const [selectedRequirement, setSelectedRequirement] = useState("");
  const [showModal, setShowModal] = useState(false);

  /* LOAD REQUIREMENTS */
  const loadProjects = async () => {
    const res = await fetch("http://localhost:5000/api/requirements");
    const data = await res.json();
    setProjects(data);
  };

  /* LOAD ARCHITECTS */
  const loadArchitects = async () => {
    const res = await fetch("http://localhost:5000/api/users");
    const users = await res.json();
    setArchitects(users.filter((u) => u.role === "architect"));
  };

  useEffect(() => {
    loadProjects();
    loadArchitects();
  }, []);

  /* ASSIGN / STATUS UPDATE */
  const assignArchitect = async (id, architectName, status = null) => {
    await fetch(`http://localhost:5000/api/requirements/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        architect: architectName,
        status: status || "ASSIGNED",
      }),
    });

    loadProjects();

    if (status === "COMPLETED") {
      alert("Project Approved");
    } else if (status === "REJECTED") {
      alert("Project Rejected");
    } else if (architectName) {
      alert("Architect Assigned");
    }
  };

  /* DELETE */
  const removeProject = async (id) => {
    await fetch(`http://localhost:5000/api/requirements/${id}`, {
      method: "DELETE",
    });

    loadProjects();
  };

  /* MODAL */
  const openModal = (req) => {
    setSelectedRequirement(req);
    setShowModal(true);
  };

  return (
    <div className="assign-page">
      <div className="assign-topbar">
        <h2>Assign Requirement</h2>
      </div>

      <div className="assign-grid">
        {projects.map((item) => (
          <Card key={item._id}>
            {/* IMAGE */}
            <div className="assign-img-box">
              {/* STATUS BADGE (FIXED) */}
              <span
                className={`assign-badge ${
                  !item.architect || item.architect === ""
                    ? "new"
                    : item.status === "COMPLETED"
                      ? "completed"
                      : item.status === "REJECTED"
                        ? "rejected"
                        : item.status === "UNDER_REVIEW"
                          ? "under-review"
                          : "assigned"
                }`}
              >
                {!item.architect || item.architect === "" ? "NEW" : item.status}
              </span>

              <img
                src={`http://localhost:5000/${item.image}`}
                alt="requirement"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "image.jpg";
                }}
              />

              <button
                className="img-view-btn"
                onClick={() => openModal(item.requirement)}
              >
                View
              </button>
            </div>

            {/* DETAILS */}
            <div className="assign-head">
              <h3>{item.project}</h3>
            </div>

            <p>
              <b>Client :</b> {item.clientName}
            </p>
            <p>
              <b>Location :</b> {item.location}
            </p>
            <p>
              <b>Type :</b> {item.type}
            </p>
            <p>
              <b>Floor :</b> {item.floor}
            </p>
            <p>
              <b>Block :</b> {item.block}
            </p>
            <p>
              <b>Budget :</b> ₹{item.budget}
            </p>
            <p>
              <b>Deadline :</b> {item.deadline}
            </p>
            <p>
              <b>Architect :</b> {item.architect || "Not Assigned"}
            </p>

            {/* SUBMITTED WORK */}
            {item.completedImage && (
              <div className="submitted-box">
                <h4>Submitted Work</h4>

                <img
                  src={`http://localhost:5000/${item.completedImage}`}
                  alt="completed"
                  className="submitted-img"
                />

                <p>{item.completedNote}</p>

                {/* APPROVE / REJECT */}
                {item.status !== "COMPLETED" && item.status !== "REJECTED" && (
                  <div className="action-buttons">
                    <button
                      className="approve-btn"
                      onClick={() =>
                        assignArchitect(item._id, item.architect, "COMPLETED")
                      }
                    >
                      Approve
                    </button>

                    <button
                      className="reject-btn"
                      onClick={() =>
                        assignArchitect(item._id, item.architect, "REJECTED")
                      }
                    >
                      Reject
                    </button>
                  </div>
                )}

                {item.status === "COMPLETED" && (
                  <p className="status-text success">✔ Approved</p>
                )}

                {item.status === "REJECTED" && (
                  <p className="status-text error">❌ Rejected</p>
                )}
              </div>
            )}

            {/* ARCHITECT SELECT */}
            <select
              className="architect-select"
              value={item.architect || ""}
              onChange={(e) => assignArchitect(item._id, e.target.value)}
            >
              <option value="">Select Architect</option>
              {architects.map((a) => (
                <option key={a._id} value={a.username}>
                  {a.username}
                </option>
              ))}
            </select>

            {/* DELETE */}
            <button
              className="assign-delete-btn"
              onClick={() => removeProject(item._id)}
            >
              Delete
            </button>
          </Card>
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h2>Requirement Details</h2>
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

export default AssignArchitect;
