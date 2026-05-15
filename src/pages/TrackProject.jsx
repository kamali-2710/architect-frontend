import React, { useEffect, useState } from "react";

import "../styles/TrackProject.css";

const TrackProject = () => {
  const [projects, setProjects] = useState([]);

  const currentUser = JSON.parse(localStorage.getItem("user"));

  /* LOAD PROJECTS */

  const loadProjects = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/requirements");

      const data = await res.json();

      const myProjects = data.filter(
        (item) => item.clientId?.toString() === currentUser._id,
      );

      setProjects(myProjects);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  /* STEP */

  const getStep = (status) => {
    switch (status) {
      case "NEW":
        return 1;

      case "ASSIGNED":
        return 2;

      case "UNDER_REVIEW":
        return 3;

      case "REJECTED":
        return 2;

      case "COMPLETED":
        return 4;

      default:
        return 1;
    }
  };

  return (
    <div className="track-page">
      <h2 className="track-title">Track Project</h2>

      <div className="track-grid">
        {projects.length > 0 ? (
          projects.map((item) => {
            const currentStep = getStep(item.status);

            return (
              <div className="track-card" key={item._id}>
                {/* PROJECT */}

                <h3>{item.project}</h3>

                <p className="track-status">
                  Current Status :<span> {item.status}</span>
                </p>

                {/* TRACK */}

                <div className="track-wrapper">
                  {/* LINE */}

                  <div className="track-line"></div>

                  {/* STEP 1 */}

                  <div
                    className={`track-step ${currentStep >= 1 ? "active" : ""}`}
                  >
                    <div className="circle">1</div>

                    <p>Submitted</p>
                  </div>

                  {/* STEP 2 */}

                  <div
                    className={`track-step ${currentStep >= 2 ? "active" : ""}`}
                  >
                    <div className="circle">2</div>

                    <p>Assigned</p>
                  </div>

                  {/* STEP 3 */}

                  <div
                    className={`track-step ${currentStep >= 3 ? "active" : ""}`}
                  >
                    <div className="circle">3</div>

                    <p>Review</p>
                  </div>

                  {/* STEP 4 */}

                  <div
                    className={`track-step ${currentStep >= 4 ? "active" : ""}`}
                  >
                    <div className="circle">4</div>

                    <p>Completed</p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="no-project">No Projects Found</div>
        )}
      </div>
    </div>
  );
};

export default TrackProject;
