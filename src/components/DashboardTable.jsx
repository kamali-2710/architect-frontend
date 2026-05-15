import React from "react";
import "../styles/DashboardTable.css";

const DashboardTable = ({ data }) => {
  /* PROGRESS FUNCTION */

  const getProgress = (status) => {
    switch (status) {
      case "NEW":
        return 10;

      case "ASSIGNED":
        return 40;

      case "UNDER_REVIEW":
        return 80;

      case "COMPLETED":
        return 100;

      case "REJECTED":
        return 60;

      default:
        return 0;
    }
  };

  return (
    <div className="table-wrapper">
      <div className="table-title">
        <h3>Recent Projects</h3>
      </div>

      <table>
        <thead>
          <tr>
            <th>Project</th>
            <th>Client</th>
            <th>Status</th>
            <th>Progress</th>
          </tr>
        </thead>

        <tbody>
          {data.slice(0, 5).map((item) => {
            const progress = getProgress(item.status);

            return (
              <tr key={item._id}>
                <td>{item.project}</td>

                <td>{item.clientName}</td>

                <td>{item.status}</td>

                <td>
                  <div className="progress-wrapper">
                    <div className="progress-box">
                      <div
                        className="progress-fill"
                        style={{
                          width: `${progress}%`,
                        }}
                      ></div>
                    </div>

                    <span className="progress-text">{progress}%</span>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardTable;
