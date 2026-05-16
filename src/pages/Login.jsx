import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Login.css";
import Swal from "sweetalert2";

import { LOGIN_API } from "../api/api";

const Login = ({ setUser }) => {
  const [phone, setPhone] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    /* PHONE VALIDATION */

    const trimmedPhone = phone.trim();

    if (!/^\d+$/.test(trimmedPhone)) {
      setError("Phone number must contain only numbers");
      return;
    }

    if (trimmedPhone.length !== 10) {
      setError("Phone number must be exactly 10 digits");
      return;
    }

    if (!/^[6-9]/.test(trimmedPhone)) {
      setError("Mobile number must start with 6-9");
      return;
    }

    /* PASSWORD */

    if (password.trim() === "") {
      setError("Password is required");
      return;
    }

    try {
      const res = await fetch(LOGIN_API, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          phone: trimmedPhone,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data.user);

        localStorage.setItem("user", JSON.stringify(data.user));

        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "Welcome back!",
          timer: 1500,
          showConfirmButton: false,
        });

        navigate("/dashboard");
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: data.message || "Invalid credentials",
          confirmButtonColor: "#6c63ff",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Something went wrong",
        confirmButtonColor: "#6c63ff",
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome Back</h2>

        <p className="subtitle">Sign in to your account</p>

        {/* {error && <div className="top-error">{error}</div>} */}

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Sign In →</button>
        </form>

        <p className="signup">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
