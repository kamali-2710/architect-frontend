import React, { useState } from "react";
import "../styles/Report.css";

const Report = () => {
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [viewData, setViewData] = useState(null);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    client: "",
    architect: "",
    status: "Pending",
    amount: "",
    date: "",
  });

  const [projects, setProjects] = useState([
    {
      id: "PRJ001",
      name: "Luxury Villa",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      architect: "Arun Kumar",
      status: "Assigned",
      client: "Karthik",
      amount: "₹12,00,000",
      date: "15 Jun 2026",
    },
    {
      id: "PRJ002",
      name: "Modern Office",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c",
      architect: "",
      status: "Pending",
      client: "Vignesh",
      amount: "₹8,50,000",
      date: "30 Jun 2026",
    },
    {
      id: "PRJ003",
      name: "Shopping Mall",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
      architect: "Priya",
      status: "Completed",
      client: "Ramesh",
      amount: "₹25,00,000",
      date: "20 Jul 2026",
    },
  ]);

  // FILTER
  const filtered =
    filter === "All" ? projects : projects.filter((p) => p.status === filter);

  // CARDS (5 cards FIXED)
  const total = projects.length;
  const assigned = projects.filter((p) => p.status === "Assigned").length;
  const pending = projects.filter((p) => p.status === "Pending").length;
  const completed = projects.filter((p) => p.status === "Completed").length;
  const notAssigned = projects.filter(
    (p) => p.status === "Not Assigned",
  ).length;

  // OPEN FORM
  const openForm = () => {
    setShowForm(true);
    setEditId(null);

    setForm({
      name: "",
      client: "",
      architect: "",
      status: "Pending",
      amount: "",
      date: "",
    });
  };

  // INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // SAVE (ADD + EDIT)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.client || !form.amount || !form.date) {
      alert("Fill all fields");
      return;
    }

    if (editId) {
      setProjects((prev) =>
        prev.map((p) => (p.id === editId ? { ...p, ...form } : p)),
      );
    } else {
      const newProject = {
        id: "PRJ" + (projects.length + 1),
        ...form,
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
      };

      setProjects([newProject, ...projects]);
    }

    setShowForm(false);
    setEditId(null);
  };

  // DELETE
  const handleDelete = (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  // EDIT
  const handleEdit = (item) => {
    setForm(item);
    setEditId(item.id);
    setShowForm(true);
  };

  return (
    <div className="report-page">
      {/* HEADER */}
      <div className="report-title">
        <h2>Project Dashboard</h2>

        <div className="top-actions">
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="All">All Status</option>
            <option value="Assigned">Assigned</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Not Assigned">Not Assigned</option>
          </select>

          <button className="add-btn" onClick={openForm}>
            + Add Project
          </button>
        </div>
      </div>

      {/* CARDS (5 CARDS FIXED) */}
      <div className="card-row">
        <div className="card assigned">
          <h4>Assigned</h4>
          <p>{assigned}</p>
        </div>

        <div className="card pending">
          <h4>Pending</h4>
          <p>{pending}</p>
        </div>

        <div className="card completed">
          <h4>Completed</h4>
          <p>{completed}</p>
        </div>

        <div className="card not">
          <h4>Not Assigned</h4>
          <p>{notAssigned}</p>
        </div>

        <div className="card total">
          <h4>Total</h4>
          <p>{total}</p>
        </div>
      </div>

      {/* TABLE */}
      <div className="report-table">
        <table>
          <thead>
            <tr>
              <th>Project</th>
              <th>Client</th>
              <th>Architect</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((item) => (
              <tr key={item.id}>
                <td className="project-cell">
                  <img src={item.image} />
                  <div>
                    <b>{item.name}</b>
                    <p>{item.id}</p>
                  </div>
                </td>

                <td>{item.client}</td>
                <td>{item.architect || "Not Assigned"}</td>
                <td>{item.date}</td>
                <td>{item.amount}</td>

                <td>
                  <span className={`report-status-badge report-${item.status.toLowerCase().replace(" ", "")}`}>
                  {item.status}</span>
                </td>

                <td className="action-icons">
                  <i
                    className="fa-regular fa-eye view"
                    onClick={() => setViewData(item)}
                  ></i>

                  <i
                    className="fa-regular fa-pen-to-square edit"
                    onClick={() => handleEdit(item)}
                  ></i>

                  <i
                    className="fa-regular fa-trash-can delete"
                    onClick={() => handleDelete(item.id)}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FORM */}
      {showForm && (
        <div className="popup">
          <form className="popup-box" onSubmit={handleSubmit}>
            <h3>{editId ? "Update Project" : "Add Project"}</h3>

            <input name="name" value={form.name} onChange={handleChange} placeholder="Enter Project Name" required />
            <input name="client" value={form.client} onChange={handleChange} placeholder="Enter Client Name" required />
            <input
              name="architect"
              value={form.architect}
              onChange={handleChange}
              placeholder="Enter Architect Name"
              required
            />

            <select name="status" value={form.status} onChange={handleChange}>
              <option value="Pending">Pending</option>
              <option value="Assigned">Assigned</option>
              <option value="Completed">Completed</option>
              <option value="Not Assigned">Not Assigned</option>
            </select>

            <input name="amount" value={form.amount} onChange={handleChange} placeholder="Enter Project Amount" required />
            <input
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange} required />

            <button type="submit">{editId ? "Update" : "Save"}</button>
            <button type="button" onClick={() => setShowForm(false)} required>
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* VIEW */}
      {viewData && (
        <div className="popup">
          <div className="popup-box">
            <h3>{viewData.name}</h3>

            <p>
              <b>Client:</b> {viewData.client}
            </p>
            <p>
              <b>Architect:</b> {viewData.architect}
            </p>
            <p>
              <b>Status:</b> {viewData.status}
            </p>
            <p>
              <b>Amount:</b> {viewData.amount}
            </p>
            <p>
              <b>Date:</b> {viewData.date}
            </p>

            <button onClick={() => setViewData(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Report;
