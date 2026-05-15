import React, { useEffect, useState } from "react";
import "../styles/Report.css";

const Report = () => {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState("All");
  const [viewData, setViewData] = useState(null);

  const loadProjects = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/requirements");

      const data = await res.json();

      setProjects(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadProjects();

    const interval = setInterval(() => {
      loadProjects();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  /* PRINT REPORT */

  const printReport = () => {
    window.print();
  };

  /* FILTER */

  const filtered =
    filter === "All" ? projects : projects.filter((p) => p.status === filter);

  /* COUNTS */

  const assigned = projects.filter((p) => p.status === "ASSIGNED").length;

  const pending = projects.filter((p) => p.status === "NEW").length;

  const completed = projects.filter((p) => p.status === "COMPLETED").length;

  const rejected = projects.filter((p) => p.status === "REJECTED").length;

  /* DELETE */

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Delete this project ?");

    if (!confirmDelete) return;

    setProjects(projects.filter((item) => item._id !== id));
  };

  return (
    <div className="report-page">
      {/* HEADER */}

      <div className="report-header">
        <div>
          <h2>Project Reports</h2>

          <p>Real-time architecture project monitoring dashboard</p>
        </div>

        <div className="top-actions">
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="All">All Projects</option>

            <option value="NEW">NEW</option>

            <option value="ASSIGNED">ASSIGNED</option>

            <option value="COMPLETED">COMPLETED</option>

            <option value="REJECTED">REJECTED</option>
          </select>

          {/* PRINT */}

          <button className="print-btn" onClick={printReport}>
            <i className="fa-solid fa-print"></i>
            Print Report
          </button>
        </div>
      </div>

      {/* STATS */}

      <div className="stats-grid">
        <div className="stats-card assigned-card">
          <h4>Assigned</h4>

          <h1>{assigned}</h1>
        </div>

        <div className="stats-card pending-card">
          <h4>New</h4>

          <h1>{pending}</h1>
        </div>

        <div className="stats-card completed-card">
          <h4>Completed</h4>

          <h1>{completed}</h1>
        </div>

        <div className="stats-card rejected-card">
          <h4>Rejected</h4>

          <h1>{rejected}</h1>
        </div>
      </div>

      {/* TABLE */}

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Project</th>

              <th>Client</th>

              <th>Architect</th>

              <th>Budget</th>

              <th>Status</th>

              <th>Payment</th>

              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((item) => (
              <tr key={item._id}>
                {/* PROJECT */}

                <td>
                  <div className="project-info">
                    <img
                      src={
                        item.image
                          ? `http://localhost:5000/${item.image}`
                          : "/image.jpg"
                      }
                      alt=""
                    />

                    <div>
                      <h4>{item.project}</h4>

                      <p>{item.type}</p>
                    </div>
                  </div>
                </td>

                {/* CLIENT */}

                <td>{item.clientName}</td>

                {/* ARCHITECT */}

                <td>{item.architect || "Not Assigned"}</td>

                {/* BUDGET */}

                <td>₹{item.budget}</td>

                {/* STATUS */}

                <td>
                  <span className={`status-badge ${item.status}`}>
                    {item.status}
                  </span>
                </td>

                {/* PAYMENT */}

                <td>
                  <span
                    className={
                      item.paymentStatus === "PAID"
                        ? "paid-badge"
                        : "pending-badge"
                    }
                  >
                    {item.paymentStatus || "PENDING"}
                  </span>
                </td>

                {/* ACTION */}

                <td className="action-btns">
                  {/* VIEW */}

                  <i
                    className="fa-regular fa-eye view-icon"
                    onClick={() => setViewData(item)}
                  ></i>

                  {/* DELETE */}

                  <i
                    className="fa-regular fa-trash-can delete-icon"
                    onClick={() => handleDelete(item._id)}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}

      {viewData && (
        <div className="modal">
          <div className="modal-box">
            <img
              src={
                viewData.image
                  ? `http://localhost:5000/${viewData.image}`
                  : "/image.jpg"
              }
              alt=""
              className="modal-img"
            />

            <h2>{viewData.project}</h2>

            <p>
              <b>Client :</b> {viewData.clientName}
            </p>

            <p>
              <b>Architect :</b> {viewData.architect || "Not Assigned"}
            </p>

            <p>
              <b>Location :</b> {viewData.location}
            </p>

            <p>
              <b>Budget :</b> ₹{viewData.budget}
            </p>

            <p>
              <b>Status :</b> {viewData.status}
            </p>

            <button className="close-btn" onClick={() => setViewData(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Report;
