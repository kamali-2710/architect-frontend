import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

/* ICON MAP */
const getIcon = (type) => {
  switch (type) {
    case "users":
      return "fa-solid fa-users";
    case "architect":
      return "fa-solid fa-user-tie";
    case "client":
      return "fa-solid fa-user";
    case "completed":
      return "fa-solid fa-circle-check";
    default:
      return "fa-solid fa-chart-simple";
  }
};

/* STAT CARD */
const StatCard = ({ icon, label, value }) => (
  <div className="card">
    <div className="card-icon">
      <i className={icon}></i>
    </div>
    <div className="card-label">{label}</div>
    <div className="card-value">{value}</div>
  </div>
);

/* DASHBOARD */
const Dashboard = ({ user }) => {
  const navigate = useNavigate();
  const role = user?.role;

  const [projects, setProjects] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/projects")
      .then((res) => res.json())
      .then(setProjects);
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((res) => res.json())
      .then(setAllUsers);
  }, []);

  const totalUsers = allUsers.length;
  const totalArchitects = allUsers.filter((u) => u.role === "architect").length;
  const totalClients = allUsers.filter((u) => u.role === "client").length;

  const completed = projects.filter((p) => p.status === "Completed").length;


  const statCards = [
    {
      icon: getIcon("users"),
      label: "Total Users",
      value: totalUsers,
    },
    {
      icon: getIcon("architect"),
      label: "Architects",
      value: totalArchitects,
    },
    {
      icon: getIcon("client"),
      label: "Clients",
      value: totalClients,
    },
    {
      icon: getIcon("completed"),
      label: "Completed",
      value: completed,
    },
  ];

  return (
    <div className="dashboard">

      {/* TOP BAR */}
      <div className="top-bar">
        <div className="top-bar-left">
          <h2>Welcome, {user?.username}</h2>
          <p>Monitor all activities here</p>
        </div>

        {role === "admin" && (
          <button
            className="add-btn"
            onClick={() => navigate("/manage-projects")}
          >
            <i className="fa-solid fa-plus"></i> Add Project
          </button>
        )}
      </div>

      {/* STATS */}
      <div className="card-container">
        {statCards.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>

      {/* RECENT PROJECTS */}
      <div className="table-box">
        <div className="table-header">
          <h3>Recent Projects</h3>
        </div>

        <table>
          <thead>
            <tr>
              <th>Project</th>
              <th>Client</th>
              <th>Status</th>
              <th>Progress</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {projects.slice(0, 5).map((p) => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.clientName || "-"}</td>
                <td>{p.status}</td>

                {/* PROGRESS */}
                <td>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${p.progress || 0}%` }}
                    ></div>
                  </div>
                  <span>{p.progress || 0}%</span>
                </td>

                {/* ACTION */}
                <td>
                  <button
                    className="view-btn"
                    onClick={() => navigate(`/project/${p._id}`)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Dashboard;