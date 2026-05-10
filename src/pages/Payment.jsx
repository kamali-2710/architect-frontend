import React, {
  useEffect,
  useState,
} from "react";

import "../styles/Payment.css";

const Payment = () => {

  const [projects, setProjects] =
    useState([]);

  const currentUser =
    JSON.parse(
      localStorage.getItem("user")
    );

  /* LOAD PROJECTS */

  const loadProjects = async () => {

    try {

      const res = await fetch(
        "http://localhost:5000/api/requirements"
      );

      const data = await res.json();

      const myProjects =
        data.filter(
          (item) =>
            item.clientId?.toString() ===
              currentUser._id &&
            item.status === "COMPLETED"
        );

      setProjects(myProjects);

    } catch (err) {

      console.log(err);
    }
  };

  useEffect(() => {

    loadProjects();

  }, []);

  /* PAYMENT */

  const payNow = async (
    project
  ) => {

    try {

      const orderRes =
        await fetch(
          "http://localhost:5000/api/payment/order",
          {
            method:"POST",

            headers:{
              "Content-Type":
              "application/json",
            },

            body:JSON.stringify({
              amount:
                project.budget
            }),
          }
        );

      const order =
        await orderRes.json();

      const options = {

        key:"YOUR_KEY_ID",

        amount:order.amount,

        currency:"INR",

        name:"Architect Hub",

        description:
          project.project,

        order_id:order.id,

        handler:
          async function(response){

          const verifyRes =
            await fetch(
              "http://localhost:5000/api/payment/verify",
              {
                method:"POST",

                headers:{
                  "Content-Type":
                  "application/json",
                },

                body:JSON.stringify({

                  ...response,

                  amount:
                    project.budget,

                  projectId:
                    project._id,

                  clientName:
                    currentUser.username,
                }),
              }
            );

          const data =
            await verifyRes.json();

          if(data.success){

            alert(
              "Payment Successful"
            );

          }else{

            alert(
              "Payment Failed"
            );
          }
        },

        theme:{
          color:"#2563eb",
        },
      };

      const razorpay =
        new window.Razorpay(
          options
        );

      razorpay.open();

    } catch (err) {

      console.log(err);

      alert(
        "Payment Error"
      );
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

          <h1>
            Secure Project Payment
          </h1>

          <p>
            Complete your project
            payment safely through
            Razorpay payment gateway.
          </p>

        </div>

      </div>

      {/* RIGHT SIDE */}

      <div className="payment-content">

        <h2 className="payment-title">
          Completed Projects
        </h2>

        <div className="payment-grid">

          {projects.length > 0 ? (

            projects.map((item) => (

              <div
                className="payment-card"
                key={item._id}
              >

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

                  <h3>
                    {item.project}
                  </h3>

                  <p>
                    <b>Architect :</b>
                    {" "}
                    {item.architect}
                  </p>

                  <p>
                    <b>Location :</b>
                    {" "}
                    {item.location}
                  </p>

                  <p>
                    <b>Budget :</b>
                    {" "}
                    ₹{item.budget}
                  </p>

                  <span className="paid-status">
                    Ready For Payment
                  </span>

                </div>

                {/* BUTTON */}

                <button
                  className="pay-btn"
                  onClick={() =>
                    payNow(item)
                  }
                >
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

              <h3>
                No Completed Projects
              </h3>

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default Payment;