import React, { useEffect, useState } from "react";

import "../styles/MyProjects.css";

import { REQUIREMENTS_API, USERS_API, IMAGE_URL } from "../api/api";

const MyProjects = () => {
  const [projects, setProjects] = useState([]);

  const currentUser = JSON.parse(localStorage.getItem("user")) || {};

  /* LOAD PROJECTS */

  const loadProjects = async () => {
    try {
      const res = await fetch(REQUIREMENTS_API);

      const data = await res.json();

      const filtered = data.filter(
        (item) => String(item.clientId) === String(currentUser._id),
      );

      setProjects(filtered);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadProjects();

    const interval = setInterval(() => {
      loadProjects();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="myprojects-page">
      <h2 className="project-title">My Projects</h2>

      <div className="project-grid">
        {projects.length > 0 ? (
          projects.map((item) => (
            <div className="project-card" key={item._id}>
              {/* STATUS BADGE */}

              <span
                className={`project-badge ${
                  item.paymentStatus === "PAID" ? "PAID" : item.status
                }`}
              >
                {item.paymentStatus === "PAID" ? "PAID" : item.status}
              </span>

              {/* IMAGE */}

              <div className="project-img-box">
                <img
                  src={item.image ? `${IMAGE_URL}${item.image}` : "/image.jpg"}
                  alt="project"
                  className="project-img"
                  onError={(e) => {
                    e.target.onerror = null;

                    e.target.src = "/image.jpg";
                  }}
                />
              </div>

              {/* CONTENT */}

              <div className="project-content">
                <h3>{item.project}</h3>

                <p>
                  <b>Client :</b> {item.clientName}
                </p>

                <p>
                  <b>Architect :</b>{" "}
                  {item.architect || "Waiting For Assignment"}
                </p>

                <p>
                  <b>Location :</b> {item.location}
                </p>

                <p>
                  <b>Project Type :</b> {item.type}
                </p>

                <p>
                  <b>Deadline :</b> {item.deadline}
                </p>

                {/* REQUIREMENT */}

                <div className="req-preview">
                  <h4>Requirement</h4>

                  <p>{item.requirement}</p>
                </div>

                {/* FLOW */}

                <div className="timeline-box">
                  {/* NEW */}

                  {item.status === "NEW" && (
                    <div className="flow-card waiting">
                      <h4>Requirement Submitted</h4>

                      <p>Waiting for admin to assign architect.</p>
                    </div>
                  )}

                  {/* ASSIGNED */}

                  {item.status === "ASSIGNED" && (
                    <div className="flow-card assigned">
                      <h4>Architect Assigned</h4>

                      <p>{item.architect} started working on your project.</p>
                    </div>
                  )}

                  {/* UNDER REVIEW */}

                  {item.status === "UNDER_REVIEW" && (
                    <div className="flow-card review">
                      <h4>Design Submitted</h4>

                      <p>Architect uploaded design. Admin reviewing now.</p>
                    </div>
                  )}

                  {/* PAID */}

                  {item.paymentStatus === "PAID" && (
                    <div className="flow-card paid-card">
                      <h4>Payment Successful</h4>

                      <p>
                        Project completed and payment finished successfully.
                      </p>

                      {item.completedImage && (
                        <img
                          src={`${IMAGE_URL}${item.completedImage}`}
                          alt="approved"
                          className="completed-img"
                        />
                      )}

                      <div className="note-box">{item.completedNote}</div>
                    </div>
                  )}

                  {/* COMPLETED */}

                  {item.status === "COMPLETED" &&
                    item.paymentStatus !== "PAID" && (
                      <div className="flow-card completed">
                        <h4>Project Approved</h4>

                        <p>Final design approved successfully.</p>

                        {item.completedImage && (
                          <img
                            src={`http://localhost:5000/${item.completedImage}`}
                            alt="approved"
                            className="completed-img"
                          />
                        )}

                        <div className="note-box">{item.completedNote}</div>
                      </div>
                    )}

                  {/* REJECTED */}

                  {item.status === "REJECTED" && (
                    <div className="flow-card rejected">
                      <h4>Rework Required</h4>

                      <p>
                        Admin rejected the design. Architect working on rework.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-project">No Projects Found</div>
        )}
      </div>
    </div>
  );
};

export default MyProjects;
