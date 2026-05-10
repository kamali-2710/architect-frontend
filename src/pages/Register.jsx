import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Register.css";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "client",
    address: "",
    experience: "",
    specialization: "",
    location: "",
    photo: null
  });

  const [error, setError] = useState("");

  /* ================= CHANGE ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRole = (role) => {
    setForm({ ...form, role });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Password not match");
      return;
    }

    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      if (res.ok) {
        alert("Register Success");
        navigate("/login");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div className="Reg-container">
      <div className="Reg-wrapper">

        {/* LEFT */}
        <div className="Reg-left">
          <div className="brand">
            <h2>𝔸rchitect Ḧub</h2>
            <p>
              Manage projects, architects and clients with a modern smart system.
            </p>

            <div className="left-stats">
              <div className="stat-card">
                <h3>120+</h3>
                <span>Projects</span>
              </div>

              <div className="stat-card">
                <h3>45+</h3>
                <span>Architects</span>
              </div>

              <div className="stat-card">
                <h3>98%</h3>
                <span>Success</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="Reg-right">
          <form className="Reg-box" onSubmit={handleSubmit}>
            <h2>Create Account</h2>
            <p className="subtitle">Register your new account</p>

            {/* ROLE */}
            <label className="role-label">Select Role</label>
            <div className="role-selector">
              <button
                type="button"
                className={form.role === "client" ? "active" : ""}
                onClick={() => handleRole("client")}
              >
                Client
              </button>

              <button
                type="button"
                className={form.role === "architect" ? "active" : ""}
                onClick={() => handleRole("architect")}
              >
                Architect
              </button>
            </div>

            {error && <div className="top-error">{error}</div>}

            {/* ROW 1 */}
            <div className="input-row">
              <input
                type="text"
                name="username"
                placeholder="User Name"
                value={form.username}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
            />

            {/* PASSWORD */}
            <div className="input-row">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
              />

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            {/* CLIENT */}
            {form.role === "client" && (
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={form.address}
                onChange={handleChange}
                required
              />
            )}

            {/* ARCHITECT */}
            {form.role === "architect" && (
              <>
                <div className="input-row">
                  <input
                    type="text"
                    name="experience"
                    placeholder="Experience"
                    value={form.experience}
                    onChange={handleChange}
                    required
                  />

                  <input
                    type="text"
                    name="specialization"
                    placeholder="Specialization"
                    value={form.specialization}
                    onChange={handleChange}
                    required
                  />
                </div>

                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={form.location}
                  onChange={handleChange}
                  required
                />

                {/* 🔥 PHOTO UPLOAD */}
                <input
                  type="file"
                  onChange={(e) =>
                    setForm({ ...form, photo: e.target.files[0] })
                  }
                />
              </>
            )}

            <button type="submit">Register</button>

            <p className="signup">
              Already have account? <Link to="/login">Login</Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;  