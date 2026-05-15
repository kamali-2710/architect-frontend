import React from "react";

import "../styles/Message.css";
// console.log("MESSAGE PAGE");
const Message = () => {
  return (
    
    <div className="msh-page">

      <div className="msh-card">

        <div className="msh-top">

          <img
            src="https://cdn-icons-png.flaticon.com/512/5968/5968841.png"
            alt="whatsapp"
          />

          <h2>Message Support</h2>

          <p>
            Need help with project updates,
            architect support or payment issues?
          </p>

        </div>

        <div className="msh-content">

          <div className="msh-box">
            <h3>Project Support</h3>

            <p>
              Get instant updates regarding
              your assigned projects and designs.
            </p>
          </div>

          <div className="msh-box">
            <h3>Architect Help</h3>

            <p>
              Contact admin directly for
              requirement clarification.
            </p>
          </div>

          <div className="msh-box">
            <h3>Payment Support</h3>

            <p>
              Facing payment or approval issues?
              Connect instantly through WhatsApp.
            </p>
          </div>

          <a
          href="https://wa.me/911234567890"
            // href="https://wa.me/918778105657?text=Hello%20Admin%20I%20Need%20Help"
            target="_blank"
            rel="noreferrer"
            className="msh-btn"
          >
            Chat on WhatsApp
          </a>

        </div>

      </div>

    </div>
  );
};

export default Message;