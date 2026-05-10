import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Login.css";

const Login = ({ setUser, users }) => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();


 const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: phone,
        password: password
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/dashboard");
    } else {
      setError(data.message || "Login failed");
    }
  } catch (err) {
    setError("Server error");
  }
};

  return (
    <div className="login-container">
      <div className="login-box">

        <h2>Welcome Back</h2>
        <p className="subtitle">Sign in to your account</p>

        {error && <div className="top-error">{error}</div>}

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
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Sign In →</button>

        </form>

        <p className="signup">
          Don't have an account?{" "}
          <Link to="/register">Register</Link>
        </p>

      </div>
    </div>
  );
};

export default Login;