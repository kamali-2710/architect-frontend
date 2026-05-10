import React from "react";

const Header = ({ user }) => {
  return (
    <header className="header">
      
      {/* LEFT SIDE TITLE */}
      <div className="header-title">
        Smart Architect Planning & Design Management System
      </div>

      {/* RIGHT SIDE PROFILE */}
      <div className="header-profile">
        <img src="/profile.jpg" alt="profile" />
        <div className="header-profile-text">
          <h3>Welcome!</h3>
          <p>{user?.username} - {user?.role}</p>
        </div>
      </div>

    </header>
  );
};

export default Header;