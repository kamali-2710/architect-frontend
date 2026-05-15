import React, { useEffect, useState } from "react";

import AdminDashboard from "./Dashboard/AdminDashboard";
import ArchitectDashboard from "./Dashboard/ArchitectDashboard";
import ClientDashboard from "./Dashboard/ClientDashboard";

const Dashboard = ({ user }) => {

  /* STATES */
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  /* LOAD DATA */
  useEffect(() => {

    fetch("http://localhost:5000/api/requirements")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.log(err));

    fetch("http://localhost:5000/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.log(err));

  }, []);

  /* SAFETY */
  if (!user) {
    return (
      <div
        style={{
          color: "white",
          padding: "40px",
        }}
      >
        User Not Found
      </div>
    );
  }

  /* ADMIN */
  if (user.role === "admin") {
    return (
      <AdminDashboard
        user={user}
        projects={projects}
        users={users}
      />
    );
  }

  /* ARCHITECT */
  if (user.role === "architect") {

    const architectProjects = projects.filter(
      (item) => item.architect === user.username
    );

    return (
      <ArchitectDashboard
        user={user}
        projects={architectProjects}
      />
    );
  }

  /* CLIENT */
  const clientProjects = projects.filter(
    (item) =>
      String(item.clientId) === String(user._id)
  );

  return (
    <ClientDashboard
      user={user}
      projects={clientProjects}
    />
  );
};

export default Dashboard;