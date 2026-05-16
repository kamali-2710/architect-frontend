import React, { useEffect, useState } from "react";

import "../styles/ManageArchitect.css";
import "../styles/Card.css";
import { USERS_API, IMAGE_URL } from "../api/api";

import Card from "../components/Card";


const ManageArchitect = () => {
  const [architects, setArchitects] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    username: "",
    phone: "",
    email: "",
    experience: "",
    specialization: "",
    projects: "",
    location: "",
    photo: "",
  });

  /* LOAD */

  const loadArchitects = async () => {
    const res = await fetch(USERS_API);

    const data = await res.json();

    const onlyArchitects = data.filter((user) => user.role === "architect");

    setArchitects(onlyArchitects);
  };

  useEffect(() => {
    loadArchitects();
  }, []);

  /* DELETE */

  const deleteArchitect = async (id) => {
    await fetch(`${USERS_API}/${id}`, {
      method: "DELETE",
    });

    loadArchitects();
  };

  /* EDIT */

  const openEdit = (item) => {
    setForm(item);

    setEditId(item._id);

    setShowModal(true);
  };

  /* CHANGE */

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* UPDATE */

  const handleUpdate = async (e) => {
    e.preventDefault();

    await fetch(`${USERS_API}/${editId}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(form),
    });

    setShowModal(false);

    loadArchitects();
  };

  return (
    <div className="architect-page">
      <div className="top-bar">
        <h2>Manage Architects</h2>
      </div>

      <div className="card-grid">
        {architects.length === 0 ? (
          <p>No Architects Found</p>
        ) : (
          architects.map((item) => (
            <Card key={item._id}>
              <img
                src={`${IMAGE_URL}/${item.photo}`}
                className="arch-img"
                alt="architect"
              />

              <div className="card-content">
                <div className="head-row">
                  <h3>{item.username}</h3>

                  <span className="status active">Active</span>
                </div>

                <p>
                  <b>ID :</b> {item._id}
                </p>

                <p>
                  <b>Phone :</b> {item.phone}
                </p>

                <p>
                  <b>Email :</b> {item.email}
                </p>

                <p>
                  <b>Experience :</b> {item.experience || "-"}
                </p>

                <p>
                  <b>Specialization :</b> {item.specialization || "-"}
                </p>

                <p>
                  <b>Location :</b> {item.location || "-"}
                </p>

                <div className="btn-group">
                  <button className="edit-btn" onClick={() => openEdit(item)}>
                    Update
                  </button>

                  <button
                    className="delete-btn2"
                    onClick={() => deleteArchitect(item._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Update Architect</h3>

            <form onSubmit={handleUpdate}>
              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Name"
              />

              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone"
              />

              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
              />

              <input
                name="experience"
                value={form.experience}
                onChange={handleChange}
                placeholder="Experience"
              />

              <input
                name="specialization"
                value={form.specialization}
                onChange={handleChange}
                placeholder="Specialization"
              />

              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Location"
              />

              <input
                name="photo"
                value={form.photo}
                onChange={handleChange}
                placeholder="Photo URL"
              />

              <div className="modal-actions">
                <button type="submit">Update</button>

                <button type="button" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageArchitect;
