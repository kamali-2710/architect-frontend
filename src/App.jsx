import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";
import Aside from "./components/Aside";
import Footer from "./components/Footer";
import Main from "./components/Main";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Upload from "./pages/Upload";

function App() {
  // ✅ SIDEBAR SHOW / HIDE
  const [showSidebar, setShowSidebar] = useState(true);

  // ✅ SAFE PARSE
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });

  const [users, setUsers] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("users")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/" element={<Login users={users} setUser={setUser} />} />

      <Route
        path="/login"
        element={<Login users={users} setUser={setUser} />}
      />

      <Route
        path="/register"
        element={<Register users={users} setUsers={setUsers} />}
      />

      {/* PRIVATE */}
      <Route
        path="/*"
        element={
          user ? (
            <div
              className={`app-container ${
                showSidebar ? "sidebar-open-layout" : "sidebar-close-layout"
              }`}
            >
              {/* HEADER */}
              <Header
                user={user}
                showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
              />

              {/* ASIDE */}
              <Aside user={user} showSidebar={showSidebar} />

              {/* MAIN */}
              <Main
                user={user}
                setUser={setUser}
                users={users}
                setUsers={setUsers}
              />

              <Footer />
            </div>
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route path="/upload" element={<Upload />} />
    </Routes>
  );
}

export default App;
