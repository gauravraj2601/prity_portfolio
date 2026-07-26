import React,{useState,useEffect} from "react";
import {Link} from "react-router-dom";
import {FaUpload,FaTrashAlt,FaEdit,FaArrowLeft,FaCheckCircle,FaExclamationCircle,FaTimes} from "react-icons/fa";
import "./AdminPortfolio.css";

const API_BASE_URL=import.meta.env.VITE_API_URL||"https://server-prity-portfolio.onrender.com";

export default function AdminPortfolio () {
  // Form states
  const [title,setTitle]=useState("");
  const [category,setCategory]=useState("Bridal");
  const [description,setDescription]=useState("");
  const [selectedFile,setSelectedFile]=useState(null);
  const [previewUrl,setPreviewUrl]=useState(null);
  console.log("API_BASE_URL",API_BASE_URL)
  // Edit State
  const [editingId,setEditingId]=useState(null);

  // Status & List states
  const [loading,setLoading]=useState(false);
  const [status,setStatus]=useState({type: "",message: ""});
  const [images,setImages]=useState([]);

  const categories=["Bridal","Party Makeup","Engagement","Reception","Traditional","HD Makeup"];

  // Fetch images from GET /api/portfolio_images
  const fetchImages=async () => {
    try {
      const response=await fetch(`${API_BASE_URL}/api/portfolio_images`);
      if (response.ok) {
        const data=await response.json();
        setImages(data);
      }
    } catch (e) {
      console.warn("Backend API not reachable:",e);
    }
  };

  useEffect(() => {
    fetchImages();
  },[]);

  // Handle local file selection preview
  const handleFileChange=(e) => {
    const file=e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader=new FileReader();
      reader.onloadend=() => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Reset form
  const resetForm=() => {
    setTitle("");
    setCategory("Bridal");
    setDescription("");
    setSelectedFile(null);
    setPreviewUrl(null);
    setEditingId(null);
    const fileInput=document.getElementById("portfolio-file-input");
    if (fileInput) fileInput.value="";
  };

  // Populate form for editing
  const handleEditClick=(img) => {
    setEditingId(img._id);
    setTitle(img.title);
    setCategory(img.category||"Bridal");
    setDescription(img.description||"");
    setPreviewUrl(img.image_url);
    setSelectedFile(null);
    window.scrollTo({top: 0,behavior: 'smooth'});
  };

  // Submit Handler (Create or Update)
  const handleSubmit=async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setStatus({type: "error",message: "Please enter an image title."});
      return;
    }

    if (!editingId&&!selectedFile) {
      setStatus({type: "error",message: "Please select an image file to upload."});
      return;
    }

    setLoading(true);
    setStatus({type: "info",message: editingId? "Updating image details...":"Uploading image to Cloudinary & saving..."});

    try {
      const formData=new FormData();
      formData.append("title",title.trim());
      formData.append("category",category);
      formData.append("description",description.trim());
      if (selectedFile) {
        formData.append("image",selectedFile);
      }

      let url=`${API_BASE_URL}/api/portfolio_images/upload`;
      let method="POST";

      if (editingId) {
        url=`${API_BASE_URL}/api/portfolio_images/${editingId}`;
        method="PUT";
      }

      const response=await fetch(url,{
        method,
        body: formData,
      });

      if (!response.ok) {
        const errorData=await response.json();
        throw new Error(errorData.message||"Failed to process request");
      }

      setStatus({
        type: "success",
        message: editingId? "Image details updated successfully!":"Image uploaded and saved successfully!",
      });

      resetForm();
      fetchImages();
    } catch (error) {
      console.error(error);
      setStatus({
        type: "error",
        message: error.message||"Operation failed. Please ensure backend server is running.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Delete Image
  const handleDelete=async (id) => {
    if (!window.confirm("Are you sure you want to delete this image from Cloudinary and Database?")) return;

    try {
      const response=await fetch(`${API_BASE_URL}/api/portfolio_images/${id}`,{
        method: "DELETE",
      });

      if (response.ok) {
        setStatus({type: "success",message: "Image deleted successfully from Cloudinary & DB!"});
        fetchImages();
      } else {
        throw new Error("Failed to delete image.");
      }
    } catch (error) {
      console.error(error);
      setStatus({type: "error",message: "Failed to delete image."});
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
          <h1 className="admin-title">Client Portfolio Admin</h1>
        </div>
      </div>

      <div className="admin-container admin-content-grid">
        {/* Upload / Edit Form Card */}
        <div className="admin-card upload-form-card">
          <h2 className="card-heading">{editingId? "Edit Image Details":"Upload Image to Cloudinary"}</h2>

          {status.message&&(
            <div className={`status-banner status-${status.type}`}>
              {status.type==="success"&&<FaCheckCircle />}
              {status.type==="error"&&<FaExclamationCircle />}
              <span>{status.message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="admin-form">
            {/* Image File Selector */}
            <div className="form-group">
              <label htmlFor="portfolio-file-input">Select Image File {editingId&&"(Optional to replace)"}</label>
              <input
                id="portfolio-file-input"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="file-input"
              />
            </div>

            {/* Preview Box */}
            {previewUrl&&(
              <div className="preview-container">
                <p className="preview-label">Image Preview:</p>
                <img src={previewUrl} alt="Preview" className="image-preview" />
              </div>
            )}

            {/* Title */}
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

            {/* Category Dropdown */}
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

            {/* Description */}
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

            {/* Submit & Cancel Buttons */}
            <div className="button-group">
              <button type="submit" disabled={loading} className="submit-btn">
                <FaUpload /> {loading? "Processing...":editingId? "Update Image":"Upload Image"}
              </button>
              {editingId&&(
                <button type="button" onClick={resetForm} className="cancel-btn">
                  <FaTimes /> Cancel Edit
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Uploaded Images List Grid */}
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
                  {img.description&&<p className="img-desc">{img.description}</p>}
                  <span className="created-date">
                    {new Date(img.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="card-actions">
                  <button className="edit-btn" onClick={() => handleEditClick(img)}>
                    <FaEdit /> Edit
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(img._id)}>
                    <FaTrashAlt /> Delete
                  </button>
                </div>
              </div>
            ))}

            {images.length===0&&(
              <p className="no-images-msg">No images uploaded yet. Upload your first portfolio photo above!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
