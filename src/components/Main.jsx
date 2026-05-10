// ========================== Main.jsx ==========================
import React from "react";
import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import ManageUsers from "../pages/ManageUsers";
import ManageArchitect from "../pages/ManageArchitect";
import AssignProject from "../pages/AssignProject";
import Report from "../pages/Report";
import Logout from "../pages/Logout";
import Mytask from "../pages/Mytask";
import Requirement from "../pages/Requirement";
import MyProjects from "../pages/MyProjects";
import TrackProject from "../pages/TrackProject";
import Payment from "../pages/Payment";

const Main = ({ user, setUser, users, setUsers }) => {
  return (
    <main>
      <Routes>
        <Route
          path="/dashboard"
          element={<Dashboard user={user} users={users} />}
        />

        {/* ADMIN */}
        <Route
          path="/manage-users"
          element={<ManageUsers users={users} setUsers={setUsers} />}
        />

        <Route path="/manage-architects" element={<ManageArchitect />} />

        <Route path="/assign-project" element={<AssignProject />} />

        <Route path="/reports" element={<Report />} />

        {/* ARCHITECT */}
        <Route path="/task" element={<Mytask />} />

        {/* CLIENT */}
        <Route path="/submit-requirement" element={<Requirement />} />
        <Route path="/view-design" element={<MyProjects />} />
        <Route path="/track-progress" element={<TrackProject />} />
        <Route path="/payment" element={<Payment />} />

        {/* LOGOUT */}
        <Route path="/logout" element={<Logout setUser={setUser} />} />
      </Routes>
    </main>
  );
};

export default Main;
