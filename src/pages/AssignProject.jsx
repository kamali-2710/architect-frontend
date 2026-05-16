import React, { useEffect, useState } from "react";

import "../styles/AssignProject.css";
import "../styles/Card.css";

import { REQUIREMENTS_API, USERS_API, IMAGE_URL } from "../api/api";

import Card from "../components/Card";
import Swal from "sweetalert2";

const AssignArchitect = () => {
  const [projects, setProjects] = useState([]);
  const [architects, setArchitects] = useState([]);
  const [selectedRequirement, setSelectedRequirement] = useState("");
  const [showModal, setShowModal] = useState(false);

  /* NEW PROJECT ALERT */
  const [prevCount, setPrevCount] = useState(0);

  /* LOAD REQUIREMENTS */
  const loadProjects = async () => {
    try {
      const res = await fetch(REQUIREMENTS_API);

      const data = await res.json();

      /* ALERT WHEN NEW PROJECT COMES */

      if (prevCount !== 0 && data.length > prevCount) {
        Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          background: "#c58122",
          color: "#ffffff",
          iconColor: "#ffffff",
        }).fire({
          icon: "success",
          title: "New Project Arrived",
        });
      }

      setPrevCount(data.length);

      setProjects(data);
    } catch (err) {
      console.log(err);
    }
  };

  /* LOAD ARCHITECTS */

  const loadArchitects = async () => {
    try {
      const res = await fetch(USERS_API);

      const users = await res.json();

      setArchitects(users.filter((u) => u.role === "architect"));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadProjects();

    loadArchitects();

    /* AUTO REFRESH */

    const interval = setInterval(() => {
      loadProjects();
    }, 5000);

    return () => clearInterval(interval);
  }, [prevCount]);

  /* ASSIGN / STATUS UPDATE */

  const assignArchitect = async (id, architectName, status = null) => {
    try {
      await fetch(`${REQUIREMENTS_API}/${id}`, {
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

      /* SWEET ALERT */

      if (status === "COMPLETED") {
        Swal.fire({
          icon: "success",
          title: "Project Approved",
          text: "Project marked as completed",
          confirmButtonColor: "#6c63ff",
        });
      } else if (status === "REJECTED") {
        Swal.fire({
          icon: "error",
          title: "Project Rejected",
          text: "Project has been rejected",
          confirmButtonColor: "#6c63ff",
        });
      } else if (architectName) {
        Swal.fire({
          icon: "success",
          title: "Architect Assigned",
          text: `${architectName} assigned successfully`,
          confirmButtonColor: "#6c63ff",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong",
        confirmButtonColor: "#6c63ff",
      });
    }
  };

  /* DELETE */

  const removeProject = async (id) => {
    const result = await Swal.fire({
      title: "Delete Project?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c63ff",
      confirmButtonText: "Yes Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await fetch(`${REQUIREMENTS_API}/${id}`, {
        method: "DELETE",
      });

      loadProjects();

      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Project deleted successfully",
        confirmButtonColor: "#6c63ff",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Delete failed",
        confirmButtonColor: "#6c63ff",
      });
    }
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
              {/* STATUS */}

              <span
                className={`assign-badge ${
                  item.paymentStatus === "PAID"
                    ? "paid"
                    : !item.architect || item.architect === ""
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
                {item.paymentStatus === "PAID"
                  ? "PAID"
                  : !item.architect || item.architect === ""
                    ? "NEW"
                    : item.status}
              </span>

              <img
                src={`${IMAGE_URL}/${item.image}`}
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
                  src={`${IMAGE_URL}/${item.completedImage}`}
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

            {(!item.status || item.status === "NEW") && (
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
            )}

            {/* DELETE */}

            {(!item.status || item.status === "NEW") && (
              <button
                className="assign-delete-btn"
                onClick={() => removeProject(item._id)}
              >
                Delete
              </button>
            )}
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
