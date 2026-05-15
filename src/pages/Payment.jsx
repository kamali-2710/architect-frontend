import React, { useEffect, useState } from "react";

import "../styles/Payment.css";
import Swal from "sweetalert2";

const Payment = () => {
  const [projects, setProjects] = useState([]);

  const currentUser = JSON.parse(localStorage.getItem("user"));

  /* LOAD PROJECTS */

  const loadProjects = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/requirements");

      const data = await res.json();

      const myProjects = data.filter(
        (item) =>
          item.clientId?.toString() === currentUser._id &&
          item.status === "COMPLETED" &&
          item.paymentStatus !== "PAID",
      );

      setProjects(myProjects);
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load projects",
        confirmButtonColor: "#2563eb",
      });
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  /* PAYMENT */

  const payNow = async (project) => {
    try {
      /* DIRECT PAID UPDATE */

      await fetch(`http://localhost:5000/api/requirements/${project._id}`, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          paymentStatus: "PAID",
        }),
      });
      /* SUCCESS ALERT */

      Swal.fire({
        icon: "success",
        title: "Payment Successful",
        text: "Project payment completed",
        confirmButtonColor: "#2563eb",
      });
      
      /* RELOAD */

      loadProjects();

      /* OPTIONAL ALERT */

      /* OPTIONAL RAZORPAY POPUP */

      const options = {
        key: "rzp_test_Sot0jydlT1LRV7",

        amount: project.budget * 100,

        currency: "INR",

        name: "Architect Hub",

        description: project.project,

        handler: function () {
          console.log("Razorpay Opened");
        },

        prefill: {
          name: currentUser.username,
        },

        theme: {
          color: "#2563eb",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (err) {
      console.log(err);

      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text: "Something went wrong",
        confirmButtonColor: "#2563eb",
      });
    }
  };

  return (
    <div className="payment-page">
      {/* LEFT SIDE */}

      <div className="payment-banner">
        <img
          src="https://img.freepik.com/free-vector/online-payments-concept-illustration_114360-1296.jpg"
          alt=""
        />

        <div className="banner-content">
          <h1>Secure Project Payment</h1>

          <p>
            Complete your project payment safely through Razorpay payment
            gateway.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}

      <div className="payment-content">
        <h2 className="payment-title">Completed Projects</h2>

        <div className="payment-grid">
          {projects.length > 0 ? (
            projects.map((item) => (
              <div className="payment-card" key={item._id}>
                {/* IMAGE */}

                <img
                  src={
                    item.completedImage
                      ? `http://localhost:5000/${item.completedImage}`
                      : "/image.jpg"
                  }
                  alt=""
                  className="payment-img"
                />

                {/* DETAILS */}

                <div className="payment-details">
                  <h3>{item.project}</h3>

                  <p>
                    <b>Architect :</b> {item.architect}
                  </p>

                  <p>
                    <b>Location :</b> {item.location}
                  </p>

                  <p>
                    <b>Budget :</b> ₹{item.budget}
                  </p>

                  <span className="paid-status">Ready For Payment</span>
                </div>

                {/* BUTTON */}

                <button className="pay-btn" onClick={() => payNow(item)}>
                  Pay Now
                </button>
              </div>
            ))
          ) : (
            <div className="empty-box">
              <img
                src="https://cdn-icons-png.flaticon.com/512/7486/7486740.png"
                alt=""
              />

              <h3>No Completed Projects</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;
