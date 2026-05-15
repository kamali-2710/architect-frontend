import React, { useState, useRef } from "react";

import Webcam from "react-webcam";

import "../styles/Requirement.css";
import Swal from "sweetalert2";

const Requirement = () => {
  const webcamRef = useRef(null);

  const [cameraOpen, setCameraOpen] = useState(false);

  const [capturedImage, setCapturedImage] = useState(null);

  const [form, setForm] = useState({
    project: "",
    location: "",
    type: "",
    floor: "",
    block: "",
    deadline: "",
    budget: "",
    requirement: "",
    image: null,
  });

  /* INPUT CHANGE */

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setForm({
        ...form,
        image: files[0],
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  /* VOICE */

  const startVoice = (lang) => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice not supported");

      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = lang;

    recognition.continuous = true;

    recognition.interimResults = false;

    recognition.onresult = (event) => {
      let text = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        text += event.results[i][0].transcript + " ";
      }

      setForm((prev) => ({
        ...prev,
        requirement: prev.requirement + text,
      }));
    };

    recognition.start();

    setTimeout(() => {
      recognition.stop();
    }, 30000);
  };

  /* CAMERA */

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();

    setCapturedImage(imageSrc);

    fetch(imageSrc)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "capture.jpg", {
          type: "image/jpeg",
        });

        setForm((prev) => ({
          ...prev,
          image: file,
        }));
      });

    setCameraOpen(false);
  };

  /* SUBMIT */

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentUser = JSON.parse(localStorage.getItem("user"));

    if (!currentUser) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login first",
        confirmButtonColor: "#6c63ff",
      });

      return;
    }

    const formData = new FormData();

    formData.append("clientId", currentUser._id);

    formData.append("clientName", currentUser.username);

    formData.append("project", form.project);

    formData.append("location", form.location);

    formData.append("type", form.type);

    formData.append("floor", form.floor);

    formData.append("block", form.block);

    formData.append("deadline", form.deadline);

    formData.append("budget", form.budget);

    formData.append("requirement", form.requirement);

    if (form.image) {
      formData.append("image", form.image);
    }

    try {
      const res = await fetch("http://localhost:5000/api/requirements", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Requirement Submitted",
          text: "Your requirement submitted successfully",
          confirmButtonColor: "#6c63ff",
        });

        setForm({
          project: "",
          location: "",
          type: "",
          floor: "",
          block: "",
          deadline: "",
          budget: "",
          requirement: "",
          image: null,
        });

        setCapturedImage(null);
      }
    } catch (err) {
      console.log(err);

      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Error submitting requirement",
        confirmButtonColor: "#6c63ff",
      });
    }
  };

  return (
    <div className="req-page">
      <div className="req-box">
        <h2 className="req-title">Requirement</h2>

        <form onSubmit={handleSubmit}>
          {/* PROJECT + LOCATION */}

          <div className="req-grid">
            <div className="field">
              <label>Project Name</label>

              <input
                type="text"
                name="project"
                value={form.project}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label>Location</label>

              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* TYPE + FLOOR */}

          <div className="req-grid">
            <div className="field">
              <label>Type</label>

              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                required
              >
                <option value="">Select Type</option>

                <option>Residential</option>

                <option>Commercial</option>

                <option>Villa</option>
              </select>
            </div>

            <div className="field">
              <label>Floor</label>

              <input
                type="number"
                name="floor"
                value={form.floor}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* BLOCK + DEADLINE */}

          <div className="req-grid">
            <div className="field">
              <label>Block</label>

              <input
                type="text"
                name="block"
                value={form.block}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label>Deadline</label>

              <input
                type="date"
                name="deadline"
                value={form.deadline}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* BUDGET */}

          <div className="field">
            <label>Budget</label>

            <input
              type="number"
              name="budget"
              value={form.budget}
              onChange={handleChange}
              min="5000"
              required
            />
          </div>

          {/* REQUIREMENT */}

          <div className="field">
            <div className="req-head">
              <label>Requirement</label>

              <div className="voice-group">
                <button
                  type="button"
                  className="voice-btn"
                  onClick={() => startVoice("en-IN")}
                >
                  Speak
                </button>

                <button
                  type="button"
                  className="voice-btn tamil-btn"
                  onClick={() => startVoice("ta-IN")}
                >
                  தமிழ்
                </button>
              </div>
            </div>

            <textarea
              rows="4"
              name="requirement"
              value={form.requirement}
              onChange={handleChange}
              placeholder="Describe your requirement..."
              required
            ></textarea>
          </div>

          {/* CAMERA */}

          <div className="field">
            <label>Upload proof of issue</label>

            {!cameraOpen ? (
              <button
                type="button"
                className="camera-btn"
                onClick={() => setCameraOpen(true)}
              >
                Open Camera
              </button>
            ) : (
              <div className="camera-box">
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  className="webcam"
                />

                <button
                  type="button"
                  className="capture-btn"
                  onClick={capturePhoto}
                >
                  Capture
                </button>
              </div>
            )}

            {capturedImage && (
              <img src={capturedImage} alt="Captured" className="preview-img" />
            )}
          </div>

          {/* SUBMIT */}

          <button type="submit" className="submit-btn">
            Submit Requirement
          </button>
        </form>
      </div>
    </div>
  );
};

export default Requirement;
