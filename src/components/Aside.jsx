import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaUserTie,
  FaTasks,
  FaChartBar,
  FaSignOutAlt,
  FaEye,
  FaEnvelope,
  FaFileAlt,
  FaClock,
  FaCreditCard
} from "react-icons/fa";

const Aside = ({ user }) => {
  return (
    <aside>
      <div className="sidebar">
        {/* 🔥 NEW LOGO SECTION */}
        <div className="sidebar-logo">
          <img src="/logo.png" alt="logo" />
          <h2>rchitect Hub</h2>
        </div>

        {/* Profile */}
        {/* <div className="profile">
          <img src="/profile.jpg" alt="profile" />
          <div className="profile-text">
            <h3>Welcome!</h3>
            <p>{user?.username} - {user?.role}</p>
          </div>
        </div> */}

        <ul>

          {/* ADMIN */}
          {user?.role === "admin" && (
            <>
              <li><Link to="/dashboard"><FaTachometerAlt /> Dashboard</Link></li>
              <li><Link to="/manage-users"><FaUsers /> Manage Clients</Link></li>
              <li><Link to="/manage-architects"><FaUserTie /> Manage Architects</Link></li>
              <li><Link to="/assign-project"><FaTasks />Assign Project</Link></li>
              <li><Link to="/reports"><FaChartBar /> Reports</Link></li>

              {/* FIXED LOGOUT */}
              <li className="logout"><Link to="/logout"><FaSignOutAlt /> Logout</Link></li>
            </>
          )}

          {/* ARCHITECT */}
          {user?.role === "architect" && (
            <>
              <li><Link to="/dashboard"><FaTachometerAlt /> Dashboard</Link></li>
              <li><Link to="/task"><FaEye /> My Task</Link></li>
              {/* <li><Link to="/upload-design"><FaUpload /> Upload</Link></li> */}
              <li><Link to="/messages"><FaEnvelope /> Messages</Link></li>

              <li className="logout"><Link to="/logout"><FaSignOutAlt /> Logout</Link></li>
            </>
          )}

          {/* USER */}
          {user?.role === "client" && (
            <>
              <li><Link to="/dashboard"><FaTachometerAlt /> Dashboard</Link></li>
              <li><Link to="/submit-requirement"><FaFileAlt /> Requirement</Link></li>
              <li><Link to="/view-design"><FaEye /> My Projects</Link></li>
              <li><Link to="/track-progress"><FaClock /> Track Project</Link></li>
              <li><Link to="/payment"><FaCreditCard /> Payment</Link></li>

              <li className="logout"><Link to="/logout"><FaSignOutAlt /> Logout</Link></li>
            </>
          )}

        </ul>
      </div>
    </aside>
  );
};

export default Aside;