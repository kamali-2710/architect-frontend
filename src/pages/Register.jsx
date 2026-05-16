import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Register.css";
import Swal from "sweetalert2";
import { REGISTER_API } from "../api/api";

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
    photo: null,
  });

  const [error, setError] = useState("");

  /* ================= CHANGE ================= */

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRole = (role) => {
    setForm({
      ...form,
      role,
    });
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    //regex
    // const phoneRegex = /^[6-9]\d{9}$/;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9]).{6,}$/;

    /* PHONE */

    const phone = form.phone.trim();

    /* ONLY NUMBERS */

    if (!/^\d+$/.test(phone)) {
      setError("Phone number must contain only numbers");

      return;
    }

    /* EXACTLY 10 DIGITS */

    if (phone.length !== 10) {
      setError("Phone number must be exactly 10 digits");

      return;
    }

    /* STARTING NUMBER */

    if (!/^[6-9]/.test(phone)) {
      setError("Mobile number must start with 6-9");

      return;
    }

    /* EMAIL */

    if (!emailRegex.test(form.email.trim())) {
      setError("Enter a valid email address");

      return;
    }

    /* PASSWORD */

    if (!passwordRegex.test(form.password)) {
      setError("Password must include uppercase letter and number");

      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    try {
      const res = await fetch(REGISTER_API, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: "Your account has been created",
          confirmButtonColor: "#6c63ff",
        });

        navigate("/login");
      } else {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: data.message,
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
    <div className="Reg-container">
      <div className="Reg-wrapper">
        {/* LEFT */}

        <div className="Reg-left">
          <div className="brand">
            <h2>𝔼lite 𝕊truct</h2>

            <p>
              Manage projects, architects and clients with a modern smart
              system.
            </p>

            <div className="left-stats">
              <div className="reg-stat-card">
                <h3>120+</h3>
                <span>Projects</span>
              </div>

              <div className="reg-stat-card">
                <h3>45+</h3>
                <span>Architects</span>
              </div>

              <div className="reg-stat-card">
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

            {/* <label className="role-label">
              Select Role
            </label> */}

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

            {/* {error && <div className="top-error">{error}</div>} */}

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
                placeholder="Min 6 chars, 1 uppercase & 1 number"
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

                <input
                  type="file"
                  required
                  onChange={(e) =>
                    setForm({
                      ...form,
                      photo: e.target.files[0],
                    })
                  }
                />
              </>
            )}

            <button type="submit">Register</button>

            <p className="signup">
              Already have account?
              <Link to="/login"> Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
