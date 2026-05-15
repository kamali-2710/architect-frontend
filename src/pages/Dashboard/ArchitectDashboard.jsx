import React, { useEffect, useState } from "react";
import StatCard from "../../components/Stat";
import DashboardTable from "../../components/DashboardTable";
import "../../styles/Dashboard.css";

const ArchitectDashboard = ({ user }) => {

  const [projects, setProjects] = useState([]);

  useEffect(() => {

    fetch("http://localhost:5000/api/requirements")
      .then((res) => res.json())
      .then((data) => {

        const myProjects = data.filter(
          (item) => item.architect === user.username
        );

        setProjects(myProjects);
      });

  }, [user]);

  return (
    <div className="dashboard">

      <div className="top-bar">
        <div className="top-bar-left">
          <h2>Welcome {user.username}</h2>
          <p>Architect Project Dashboard</p>
        </div>
      </div>

      <div className="card-container">

        <StatCard
          icon="fa-solid fa-briefcase"
          label="My Tasks"
          value={projects.length}
        />

        <StatCard
          icon="fa-solid fa-clock"
          label="Pending"
          value={projects.filter((p) => p.status === "ASSIGNED").length}
        />

        <StatCard
          icon="fa-solid fa-rotate"
          label="Rework"
          value={projects.filter((p) => p.status === "REJECTED").length}
        />

        <StatCard
          icon="fa-solid fa-circle-check"
          label="Completed"
          value={projects.filter((p) => p.status === "COMPLETED").length}
        />

      </div>

      <DashboardTable data={projects} />

    </div>
  );
};

export default ArchitectDashboard;