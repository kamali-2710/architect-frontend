import React, { useEffect, useState } from "react";

import Stat from "../../components/Stat";
import DashboardTable from "../../components/DashboardTable";
import { DASHBOARD_API } from "../../api/api";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import "../../styles/Dashboard.css";

const AdminDashboard = ({ user }) => {
  const [stats, setStats] = useState({});
  const [projects, setProjects] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [statusData, setStatusData] = useState([]);

  useEffect(() => {
   fetch(DASHBOARD_API)
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setProjects(data.recentProjects);
        setChartData(data.monthlyProjects);
        setStatusData(data.statusData);
      });
  }, []);

  const COLORS = ["#10b981", "#6366f1", "#f59e0b", "#22d3ee", "#ef4444"];

  return (
    <div className="dashboard">
      {/* TOP */}
      <div className="top-bar">
        <div className="top-bar-left">
          <h2>Welcome Admin</h2>
          <p>Monitor platform activity</p>
        </div>
      </div>

      {/* STATS */}
      <div className="card-container">
        <Stat
          icon="fa-solid fa-users"
          label="Total Users"
          value={stats.totalUsers || 0}
        />
        <Stat
          icon="fa-solid fa-user-tie"
          label="Architects"
          value={stats.totalArchitects || 0}
        />
        <Stat
          icon="fa-solid fa-user"
          label="Clients"
          value={stats.totalClients || 0}
        />
        <Stat
          icon="fa-solid fa-circle-check"
          label="Completed"
          value={stats.completedProjects || 0}
        />
      </div>

      {/* CHARTS */}
      <div className="chart-grid">
        {/* BAR */}
        <div
          className="chart-box"
          style={{
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div className="chart-header">
            <h3>Monthly Projects</h3>
          </div>

          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={chartData}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#2563eb" />
                </linearGradient>
              </defs>

              <XAxis dataKey="name" />
              <YAxis />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#0c2257",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "10px",
                  color: "#fff",
                  fontSize: "12px",
                }}
                cursor={{ fill: "transparent" }}
              />

              <Bar dataKey="value" fill="url(#barGradient)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* PIE */}
        <div className="chart-box">
          <div className="chart-header">
            <h3>Project Status</h3>
          </div>

          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                outerRadius={110}
                dataKey="value"
                label
              >
                {statusData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>

              <Legend
                wrapperStyle={{
                  color: "#fff",
                  fontSize: "13px",
                  paddingTop: "10px",
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0c2257",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "10px",
                  fontSize: "12px",
                  padding: "4px 10px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* TABLE */}
      <DashboardTable data={projects} />
    </div>
  );
};

export default AdminDashboard;
