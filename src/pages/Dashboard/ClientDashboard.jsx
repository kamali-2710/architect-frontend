import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import StatCard from "../../components/Stat";
import DashboardTable from "../../components/DashboardTable";

import "../../styles/Dashboard.css";
import { REQUIREMENTS_API } from "../../api/api";

const ClientDashboard = ({ user }) => {

  const [projects, setProjects] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {

    fetch(REQUIREMENTS_API)
      .then((res) => res.json())
      .then((data) => {

        const myProjects = data.filter(
          (item) => String(item.clientId) === String(user._id)
        );

        setProjects(myProjects);
      });

  }, [user]);

  return (
    <div className="dashboard">

      {/* TOP BAR */}

      <div className="top-bar">

        <div className="top-bar-left">
          <h2>Welcome {user.username}</h2>
          <p>Track your projects easily</p>
        </div>

        {/* NEW PROJECT BUTTON */}

        <div className="top-bar-right">

          <button
            className="new-project-btn"
            onClick={() => navigate("/submit-requirement")}
          >
            + New Project
          </button>

        </div>

      </div>

      {/* CARDS */}

      <div className="card-container">

        <StatCard
          icon="fa-solid fa-folder"
          label="Projects"
          value={projects.length}
        />

        <StatCard
          icon="fa-solid fa-spinner"
          label="In Progress"
          value={
            projects.filter(
              (p) => p.status === "ASSIGNED"
            ).length
          }
        />

        <StatCard
          icon="fa-solid fa-clock"
          label="Under Review"
          value={
            projects.filter(
              (p) => p.status === "UNDER_REVIEW"
            ).length
          }
        />

        <StatCard
          icon="fa-solid fa-circle-check"
          label="Completed"
          value={
            projects.filter(
              (p) => p.status === "COMPLETED"
            ).length
          }
        />

      </div>

      {/* TABLE */}

      <DashboardTable data={projects} />

    </div>
  );
};

export default ClientDashboard;