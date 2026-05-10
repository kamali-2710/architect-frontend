import React, { useEffect, useState, useRef } from "react";
import "../styles/Upload.css";

const Upload = () => {
  const [tasks, setTasks] = useState([]);
  const [files, setFiles] = useState({});
  const [notes, setNotes] = useState({});
  const fileInputRef = useRef({});

  const currentUser = JSON.parse(localStorage.getItem("user"));

  const taskId = new URLSearchParams(window.location.search).get("id");

  /* LOAD ONLY SINGLE TASK (FIX DUPLICATE) */
  const loadTasks = async () => {
    const res = await fetch("http://localhost:5000/api/requirements");
    const data = await res.json();

    const filtered = data.filter(
      (item) =>
        item._id === taskId &&
        item.architect === currentUser.username
    );

    setTasks(filtered);
  };

  useEffect(() => {
    if (taskId) loadTasks();
  }, [taskId]);

  /* SUBMIT WORK */
  const submitWork = async (id) => {
    const formData = new FormData();
    formData.append("completedImage", files[id]);
    formData.append("completedNote", notes[id]);

    const res = await fetch(
      `http://localhost:5000/api/requirements/upload/${id}`,
      {
        method: "PUT",
        body: formData,
      }
    );

    if (res.ok) {
      alert("Uploaded Successfully");
      loadTasks();

      setFiles({});
      setNotes({});

      if (fileInputRef.current[id]) {
        fileInputRef.current[id].value = "";
      }
    } else {
      alert("Upload Failed");
    }
  };

  return (
    <div className="upload-page">
      <h2>Upload Work</h2>

      <div className="upload-grid">
        {tasks.length > 0 ? (
          tasks.map((item) => (
            <form
              key={item._id}
              className="upload-card"
              onSubmit={(e) => {
                e.preventDefault();
                submitWork(item._id);
              }}
            >
              <img
                src={`http://localhost:5000/${item.image}`}
                className="upload-img"
              />

              <h3>{item.project}</h3>

              <p><b>Status:</b> {item.status}</p>

              {/* FILE */}
              <input
                type="file"
                ref={(el) => (fileInputRef.current[item._id] = el)}
                onChange={(e) =>
                  setFiles({
                    ...files,
                    [item._id]: e.target.files[0],
                  })
                }
              />

              {/* PREVIEW */}
              {files[item._id] && (
                <img
                  src={URL.createObjectURL(files[item._id])}
                  className="preview-img"
                />
              )}

              {/* NOTE */}
              <textarea
                placeholder="Notes"
                value={notes[item._id] || ""}
                onChange={(e) =>
                  setNotes({
                    ...notes,
                    [item._id]: e.target.value,
                  })
                }
              />

              <button className="submit-btn">
                Submit Work
              </button>
            </form>
          ))
        ) : (
          <p>No Task Found</p>
        )}
      </div>
    </div>
  );
};

export default Upload;