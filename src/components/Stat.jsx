import React from "react";
import "../styles/Stat.css";

const StatCard = ({ icon, label, value }) => {
  return (
    <div className="stat-card">

      <div className="stat-icon">
        <i className={icon}></i>
      </div>

      <div className="stat-info">
        <p>{label}</p>
        <h2>{value}</h2>
      </div>

    </div>
  );
};

export default StatCard;