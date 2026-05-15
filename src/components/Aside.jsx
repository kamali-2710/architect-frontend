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

const Aside = ({ user, showSidebar }) => {
  return (
    <aside className={showSidebar ? "sidebar-open" : "sidebar-close"}>
      <div className="sidebar">
        {/* 🔥 NEW LOGO SECTION */}
        <div className="sidebar-logo">
          <img src="/logo.png" alt="logo" />
          <h2>Elite Struct</h2>
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
              <li><Link to="/dashboard"><FaTachometerAlt /><span>Dashboard</span></Link></li>
              
              <li><Link to="/manage-users"><FaUsers /> <span>Manage Clients</span></Link></li>
              <li><Link to="/manage-architects"><FaUserTie /><span>Manage Architects</span></Link></li>
              <li><Link to="/assign-project"><FaTasks /><span>Assign Project</span></Link></li>
              <li><Link to="/reports"><FaChartBar /> <span>Reports</span></Link></li>

              {/* FIXED LOGOUT */}
              <li className="logout"><Link to="/logout"><FaSignOutAlt /><span>Logout</span></Link></li>
            </>
          )}

          {/* ARCHITECT */}
          {user?.role === "architect" && (
            <>
              <li><Link to="/dashboard"><FaTachometerAlt /><span>Dashboard</span></Link></li>
              <li><Link to="/task"><FaEye /><span> My Task</span></Link></li>
              {/* <li><Link to="/upload-design"><FaUpload /> Upload</Link></li> */}
              <li><Link to="/message"><FaEnvelope /> <span>Messages</span></Link></li>

              <li className="logout"><Link to="/logout"><FaSignOutAlt /> <span>Logout</span></Link></li>
            </>
          )}

          {/* USER */}
          {user?.role === "client" && (
            <>
              <li><Link to="/dashboard"><FaTachometerAlt /> <span>Dashboard</span></Link></li>
              <li><Link to="/submit-requirement"><FaFileAlt /> <span>Requirement</span></Link></li>
              <li><Link to="/view-design"><FaEye /> <span>My Projects</span></Link></li>
              <li><Link to="/track-progress"><FaClock /> <span>Track Project</span></Link></li>
              <li><Link to="/payment"><FaCreditCard /> <span>Payment</span></Link></li>

              <li className="logout"><Link to="/logout"><FaSignOutAlt /> <span>Logout</span></Link></li>
            </>
          )}

        </ul>
      </div>
    </aside>
  );
};

export default Aside;