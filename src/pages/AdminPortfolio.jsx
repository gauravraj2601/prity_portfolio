import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaUpload,
  FaTrashAlt,
  FaEdit,
  FaArrowLeft,
  FaCheckCircle,
  FaExclamationCircle,
  FaTimes,
  FaImage,
  FaVideo,
  FaHeart,
  FaComment,
  FaExternalLinkAlt,
} from "react-icons/fa";
import "./AdminPortfolio.css";

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://server-prity-portfolio.onrender.com";

export default function AdminPortfolio() {
  // Tab State: "images" | "reels"
  const [activeTab, setActiveTab] = useState("images");

  // --- Portfolio Images Form & List State ---
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Bridal");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [editingImageId, setEditingImageId] = useState(null);
  const [images, setImages] = useState([]);

  // --- Reels Form & List State ---
  const [reelUrl, setReelUrl] = useState("");
  const [likesCount, setLikesCount] = useState("");
  const [commentsCount, setCommentsCount] = useState("");
  const [caption, setCaption] = useState("");
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreviewUrl, setCoverPreviewUrl] = useState(null);
  const [editingReelId, setEditingReelId] = useState(null);
  const [reels, setReels] = useState([]);

  // Common UI State
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const categories = ["Bridal", "Party Makeup", "Engagement", "Reception", "Traditional", "HD Makeup"];

  // Fetch Images
  const fetchImages = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/portfolio_images`);
      if (response.ok) {
        const data = await response.json();
        setImages(data);
      }
    } catch (e) {
      console.warn("Backend API /api/portfolio_images not reachable:", e);
    }
  };

  // Fetch Reels
  const fetchReels = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/reels`);
      if (response.ok) {
        const data = await response.json();
        setReels(data);
      }
    } catch (e) {
      console.warn("Backend API /api/reels not reachable:", e);
    }
  };

  useEffect(() => {
    fetchImages();
    fetchReels();
  }, []);

  // --- File Handlers ---
  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleCoverFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setCoverPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // --- Reset Forms ---
  const resetImageForm = () => {
    setTitle("");
    setCategory("Bridal");
    setDescription("");
    setSelectedFile(null);
    setPreviewUrl(null);
    setEditingImageId(null);
    const input = document.getElementById("portfolio-file-input");
    if (input) input.value = "";
  };

  const resetReelForm = () => {
    setReelUrl("");
    setLikesCount("");
    setCommentsCount("");
    setCaption("");
    setCoverFile(null);
    setCoverPreviewUrl(null);
    setEditingReelId(null);
    const input = document.getElementById("reel-cover-file-input");
    if (input) input.value = "";
  };

  // --- Image Handlers ---
  const handleEditImageClick = (img) => {
    setEditingImageId(img._id);
    setTitle(img.title);
    setCategory(img.category || "Bridal");
    setDescription(img.description || "");
    setPreviewUrl(img.image_url);
    setSelectedFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setStatus({ type: "error", message: "Please enter an image title." });
      return;
    }
    if (!editingImageId && !selectedFile) {
      setStatus({ type: "error", message: "Please select an image file to upload." });
      return;
    }

    setLoading(true);
    setStatus({
      type: "info",
      message: editingImageId ? "Updating image details..." : "Uploading image to Cloudinary & saving...",
    });

    try {
      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("category", category);
      formData.append("description", description.trim());
      if (selectedFile) formData.append("image", selectedFile);

      let url = `${API_BASE_URL}/api/portfolio_images/upload`;
      let method = "POST";
      if (editingImageId) {
        url = `${API_BASE_URL}/api/portfolio_images/${editingImageId}`;
        method = "PUT";
      }

      const response = await fetch(url, { method, body: formData });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Failed to save image.");
      }

      setStatus({
        type: "success",
        message: editingImageId ? "Portfolio image updated successfully!" : "Portfolio image uploaded successfully!",
      });
      resetImageForm();
      fetchImages();
    } catch (err) {
      setStatus({ type: "error", message: err.message || "Operation failed." });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImage = async (id) => {
    if (!window.confirm("Delete this portfolio image from Cloudinary and Database?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/portfolio_images/${id}`, { method: "DELETE" });
      if (res.ok) {
        setStatus({ type: "success", message: "Portfolio image deleted." });
        fetchImages();
      }
    } catch (e) {
      setStatus({ type: "error", message: "Failed to delete image." });
    }
  };

  // --- Reel Handlers ---
  const handleEditReelClick = (reel) => {
    setEditingReelId(reel._id);
    setReelUrl(reel.reel_url);
    setLikesCount(reel.likes_count || "");
    setCommentsCount(reel.comments_count || "");
    setCaption(reel.caption || "");
    setCoverPreviewUrl(reel.cover_image_url);
    setCoverFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReelSubmit = async (e) => {
    e.preventDefault();
    if (!reelUrl.trim()) {
      setStatus({ type: "error", message: "Please enter the Instagram Reel URL." });
      return;
    }
    if (!editingReelId && !coverFile) {
      setStatus({ type: "error", message: "Please select a cover photo for the Reel." });
      return;
    }

    setLoading(true);
    setStatus({
      type: "info",
      message: editingReelId ? "Updating Reel details..." : "Uploading Reel cover photo & saving...",
    });

    try {
      const formData = new FormData();
      formData.append("reel_url", reelUrl.trim());
      formData.append("likes_count", likesCount.trim() || "0");
      formData.append("comments_count", commentsCount.trim() || "0");
      formData.append("caption", caption.trim());
      if (coverFile) formData.append("coverImage", coverFile);

      let url = `${API_BASE_URL}/api/reels/upload`;
      let method = "POST";
      if (editingReelId) {
        url = `${API_BASE_URL}/api/reels/${editingReelId}`;
        method = "PUT";
      }

      const response = await fetch(url, { method, body: formData });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Failed to save Reel.");
      }

      setStatus({
        type: "success",
        message: editingReelId ? "Insta Reel updated successfully!" : "Insta Reel added successfully!",
      });
      resetReelForm();
      fetchReels();
    } catch (err) {
      setStatus({ type: "error", message: err.message || "Operation failed." });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReel = async (id) => {
    if (!window.confirm("Delete this Reel from Cloudinary and Database?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/reels/${id}`, { method: "DELETE" });
      if (res.ok) {
        setStatus({ type: "success", message: "Insta Reel deleted." });
        fetchReels();
      }
    } catch (e) {
      setStatus({ type: "error", message: "Failed to delete Reel." });
    }
  };

  return (
    <div className="admin-portfolio-page">
      <div className="admin-header-bg">
        <div className="admin-container">
          <Link to="/" className="back-link">
            <FaArrowLeft /> Back to Website
          </Link>
          <span className="admin-subtitle">Management Console</span>
          <h1 className="admin-title">Client Portfolio & Social Admin</h1>
        </div>
      </div>

      <div className="admin-container">
        {/* Navigation Tabs */}
        <div className="admin-tabs">
          <button
            className={`admin-tab-btn ${activeTab === "images" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("images");
              setStatus({ type: "", message: "" });
            }}
          >
            <FaImage /> Portfolio Images
          </button>
          <button
            className={`admin-tab-btn ${activeTab === "reels" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("reels");
              setStatus({ type: "", message: "" });
            }}
          >
            <FaVideo /> Insta Reels & Journey
          </button>
        </div>

        {/* Global Status Banner */}
        {status.message && (
          <div className={`status-banner status-${status.type}`}>
            {status.type === "success" && <FaCheckCircle />}
            {status.type === "error" && <FaExclamationCircle />}
            <span>{status.message}</span>
          </div>
        )}

        {/* --- TAB 1: PORTFOLIO IMAGES --- */}
        {activeTab === "images" && (
          <div className="admin-content-grid">
            {/* Upload/Edit Form */}
            <div className="admin-card upload-form-card">
              <h2 className="card-heading">
                {editingImageId ? "Edit Portfolio Image" : "Upload Portfolio Image"}
              </h2>

              <form onSubmit={handleImageSubmit} className="admin-form">
                <div className="form-group">
                  <label htmlFor="portfolio-file-input">
                    Select Image File {editingImageId && "(Optional to replace)"}
                  </label>
                  <input
                    id="portfolio-file-input"
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                    className="file-input"
                  />
                </div>

                {previewUrl && (
                  <div className="preview-container">
                    <p className="preview-label">Image Preview:</p>
                    <img src={previewUrl} alt="Preview" className="image-preview" />
                  </div>
                )}

                <div className="form-group">
                  <label>Title *</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Royal Red Bridal Look"
                    required
                    className="text-input"
                  />
                </div>

                <div className="form-group">
                  <label>Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="select-input"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Detailed description of the makeover..."
                    rows="3"
                    className="textarea-input"
                  />
                </div>

                <div className="button-group">
                  <button type="submit" disabled={loading} className="submit-btn">
                    <FaUpload />{" "}
                    {loading ? "Processing..." : editingImageId ? "Update Image" : "Upload Image"}
                  </button>
                  {editingImageId && (
                    <button type="button" onClick={resetImageForm} className="cancel-btn">
                      <FaTimes /> Cancel Edit
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* List Card */}
            <div className="admin-card items-list-card">
              <div className="list-header">
                <h2>Uploaded Portfolio Images ({images.length})</h2>
              </div>

              <div className="images-grid">
                {images.map((img) => (
                  <div className="image-admin-card" key={img._id}>
                    <div className="image-wrapper">
                      <img src={img.image_url} alt={img.title} />
                      <span className="category-badge">{img.category}</span>
                    </div>
                    <div className="card-details">
                      <h3>{img.title}</h3>
                      {img.description && <p className="img-desc">{img.description}</p>}
                      <span className="created-date">
                        {new Date(img.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="card-actions">
                      <button className="edit-btn" onClick={() => handleEditImageClick(img)}>
                        <FaEdit /> Edit
                      </button>
                      <button className="delete-btn" onClick={() => handleDeleteImage(img._id)}>
                        <FaTrashAlt /> Delete
                      </button>
                    </div>
                  </div>
                ))}

                {images.length === 0 && (
                  <p className="no-images-msg">No images uploaded yet.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 2: INSTA REELS & JOURNEY --- */}
        {activeTab === "reels" && (
          <div className="admin-content-grid">
            {/* Reel Form Card */}
            <div className="admin-card upload-form-card">
              <h2 className="card-heading">
                {editingReelId ? "Edit Insta Reel Link & Details" : "Add Insta Reel / Video"}
              </h2>

              <form onSubmit={handleReelSubmit} className="admin-form">
                <div className="form-group">
                  <label htmlFor="reel-cover-file-input">
                    Cover Photo * {editingReelId && "(Optional to replace)"}
                  </label>
                  <input
                    id="reel-cover-file-input"
                    type="file"
                    accept="image/*"
                    onChange={handleCoverFileChange}
                    className="file-input"
                  />
                </div>

                {coverPreviewUrl && (
                  <div className="preview-container">
                    <p className="preview-label">Cover Photo Preview:</p>
                    <img src={coverPreviewUrl} alt="Cover Preview" className="image-preview" />
                  </div>
                )}

                <div className="form-group">
                  <label>Instagram Reel Link / Video URL *</label>
                  <input
                    type="url"
                    value={reelUrl}
                    onChange={(e) => setReelUrl(e.target.value)}
                    placeholder="https://www.instagram.com/reel/C3x9.../"
                    required
                    className="text-input"
                  />
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label>Likes Count</label>
                    <input
                      type="text"
                      value={likesCount}
                      onChange={(e) => setLikesCount(e.target.value)}
                      placeholder="e.g. 1.2k or 250"
                      className="text-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Comments Count</label>
                    <input
                      type="text"
                      value={commentsCount}
                      onChange={(e) => setCommentsCount(e.target.value)}
                      placeholder="e.g. 84"
                      className="text-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Caption / Title (Optional)</label>
                  <input
                    type="text"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="e.g. Glamorous Royal Red Makeover ✨"
                    className="text-input"
                  />
                </div>

                <div className="button-group">
                  <button type="submit" disabled={loading} className="submit-btn">
                    <FaUpload />{" "}
                    {loading ? "Processing..." : editingReelId ? "Update Reel" : "Add Reel"}
                  </button>
                  {editingReelId && (
                    <button type="button" onClick={resetReelForm} className="cancel-btn">
                      <FaTimes /> Cancel Edit
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Reel List Card */}
            <div className="admin-card items-list-card">
              <div className="list-header">
                <h2>Uploaded Insta Reels ({reels.length})</h2>
              </div>

              <div className="images-grid">
                {reels.map((reel) => (
                  <div className="image-admin-card" key={reel._id}>
                    <div className="image-wrapper">
                      <img src={reel.cover_image_url} alt={reel.caption || "Insta Reel Cover"} />
                      <div className="reel-stat-overlay-preview">
                        <span>
                          <FaHeart /> {reel.likes_count || "0"}
                        </span>
                        <span>
                          <FaComment /> {reel.comments_count || "0"}
                        </span>
                      </div>
                    </div>
                    <div className="card-details">
                      <h3>{reel.caption || "Instagram Reel"}</h3>
                      <a
                        href={reel.reel_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="reel-link-preview"
                      >
                        <FaExternalLinkAlt /> View Reel Link
                      </a>
                    </div>
                    <div className="card-actions">
                      <button className="edit-btn" onClick={() => handleEditReelClick(reel)}>
                        <FaEdit /> Edit
                      </button>
                      <button className="delete-btn" onClick={() => handleDeleteReel(reel._id)}>
                        <FaTrashAlt /> Delete
                      </button>
                    </div>
                  </div>
                ))}

                {reels.length === 0 && (
                  <p className="no-images-msg">No Insta Reels added yet.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
