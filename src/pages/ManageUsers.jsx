import React, { useState, useEffect } from "react";
import "../styles/ManageUsers.css";

import { USERS_API, IMAGE_URL } from "../api/api";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    username: "",
    phone: "",
    email: "",
    preview: "",
  });

  /* ================= FETCH USERS ================= */
  useEffect(() => {
    fetch(USERS_API)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.log(err));
  }, []);

  /* only clients */
  const clientUsers = users.filter((u) => u.role === "client");

  /* ================= DELETE USER (FIXED) ================= */
  const deleteUser = async (id) => {
    await fetch(`${USERS_API}/${id}`, {
      method: "DELETE",
    });

    // ✅ FIXED LINE
    setUsers((prev) => prev.filter((u) => u._id !== id));
  };

  /* ================= EDIT USER ================= */
  const editUser = (user) => {
    setForm(user);
    setEditId(user._id);
    setShowForm(true);
  };

  /* ================= FORM CHANGE ================= */
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* ================= IMAGE ================= */
  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setForm({
        ...form,
        preview: URL.createObjectURL(file),
      });
    }
  };

  /* ================= UPDATE USER ================= */
  const updateUser = async (e) => {
    e.preventDefault();

    const res = await fetch(`${USERS_API}/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const updated = await res.json();

    // ✅ FIXED LINE
    setUsers((prev) => prev.map((u) => (u._id === editId ? updated : u)));

    setShowForm(false);
  };

  return (
    <div className="manage-users">
      <div className="top-bar">
        <h2>Manage Users</h2>
      </div>

      <div className="table-box">
        <table>
          <thead>
            <tr>
              <th>Profile</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {clientUsers.map((u) => (
              <tr key={u._id}>
                <td>
                  <img
                    src={
                      u.photo
                        ? `${IMAGE_URL}/${u.photo}`
                        : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    }
                    className="table-img"
                    alt="profile"
                  />
                </td>

                <td>{u.username}</td>
                <td>{u.phone}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>

                <td>
                  <button
                    className="delete-button"
                    onClick={() => deleteUser(u._id)}
                  >
                    Delete
                  </button>

                  <button className="update-btn" onClick={() => editUser(u)}>
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Update User</h3>

            <form onSubmit={updateUser}>
              <input
                name="username"
                value={form.username || ""}
                onChange={handleChange}
              />

              <input
                name="phone"
                value={form.phone || ""}
                onChange={handleChange}
              />

              <input
                name="email"
                value={form.email || ""}
                onChange={handleChange}
              />

              <input type="file" onChange={handleImage} />

              <div className="modal-actions">
                <button type="submit">Save</button>

                <button type="button" onClick={() => setShowForm(false)}>
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

export default ManageUsers;
