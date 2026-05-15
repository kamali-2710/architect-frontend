import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/Upload.css";

import Swal from "sweetalert2";

const Upload = () => {
  const [tasks, setTasks] = useState([]);
  const [files, setFiles] = useState({});
  const [notes, setNotes] = useState({});
  const [error, setError] = useState("");

  const fileInputRef = useRef({});

  const navigate = useNavigate();

  const currentUser = JSON.parse(
    localStorage.getItem("user")
  );

  const taskId = new URLSearchParams(
    window.location.search
  ).get("id");

  /* LOAD ONLY SINGLE TASK */

  const loadTasks = async () => {
    const res = await fetch(
      "http://localhost:5000/api/requirements"
    );

    const data = await res.json();

    const filtered = data.filter(
      (item) =>
        item._id === taskId &&
        item.architect ===
          currentUser.username
    );

    setTasks(filtered);
  };

  useEffect(() => {
    if (taskId) loadTasks();
  }, [taskId]);

  /* SUBMIT WORK */

  const submitWork = async (id) => {
    /* IMAGE VALIDATION */

    if (!files[id]) {
      Swal.fire({
        icon: "warning",
        title: "Image Required",
        text: "Please upload image",
        confirmButtonColor: "#2563eb",
      });

      return;
    }

    setError("");

    const formData = new FormData();

    formData.append(
      "completedImage",
      files[id]
    );

    formData.append(
      "completedNote",
      notes[id]
    );

    try {
      const res = await fetch(
        `http://localhost:5000/api/requirements/upload/${id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (res.ok) {
        setError("");

        Swal.fire({
          icon: "success",
          title: "Uploaded Successfully",
          text: "Project work submitted",
          confirmButtonColor: "#2563eb",
        });

        navigate("/task");
      } else {
        Swal.fire({
          icon: "error",
          title: "Upload Failed",
          text: "Something went wrong",
          confirmButtonColor: "#2563eb",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Please try again later",
        confirmButtonColor: "#2563eb",
      });
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

              <p>
                <b>Status:</b>{" "}
                {item.status}
              </p>

              {/* FILE */}

              <input
                type="file"
                ref={(el) =>
                  (fileInputRef.current[item._id] =
                    el)
                }
                onChange={(e) => {
                  setFiles({
                    ...files,

                    [item._id]:
                      e.target.files[0],
                  });

                  setError("");
                }}
              />

              {/* ERROR */}

              {error && (
                <p className="upload-error-msg">
                  {error}
                </p>
              )}

              {/* PREVIEW */}

              {files[item._id] && (
                <img
                  src={URL.createObjectURL(
                    files[item._id]
                  )}
                  className="preview-img"
                />
              )}

              {/* NOTE */}

              <textarea
                placeholder="Notes"
                value={
                  notes[item._id] || ""
                }
                onChange={(e) =>
                  setNotes({
                    ...notes,

                    [item._id]:
                      e.target.value,
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