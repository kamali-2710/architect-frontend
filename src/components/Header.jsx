import React from "react";
import { FaBars } from "react-icons/fa";

const Header = ({ user, showSidebar, setShowSidebar }) => {
  return (
    <header className="header">

      {/* LEFT SIDE BURGER ICON */}
      <div
        className="menu-icon"
        onClick={() => setShowSidebar(!showSidebar)}
      >
        <FaBars />
      </div>

      {/* RIGHT SIDE PROFILE */}
      <div className="header-profile">
        <img src="/profile.png" alt="profile" />

        <div className="header-profile-text">
          <h3>Welcome!</h3>

          <p>
            {user?.username} - {user?.role}
          </p>
        </div>
      </div>

    </header>
  );
};

export default Header;