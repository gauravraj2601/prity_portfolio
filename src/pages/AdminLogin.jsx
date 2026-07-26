import React, { useState } from "react";
import { FaLock, FaUser, FaEye, FaEyeSlash, FaArrowLeft, FaShieldAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./AdminLogin.css";

export default function AdminLogin({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Hardcoded credentials requirement
    if (username.trim() === "admin" && password === "admin@2601") {
      sessionStorage.setItem("isAdminLoggedIn", "true");
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } else {
      setError("Invalid username or password. Please try again.");
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-container">
        <div className="admin-login-header">
          <div className="admin-icon-circle">
            <FaShieldAlt className="admin-shield-icon" />
          </div>
          <h2>Admin Portal Access</h2>
          <p>Please enter your credentials to manage portfolio content</p>
        </div>

        {error && (
          <div className="admin-login-error">
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <div className="input-with-icon">
              <FaUser className="input-icon" />
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                required
                autoComplete="off"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-with-icon">
              <FaLock className="input-icon" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button type="submit" className="login-submit-btn">
            Login to Admin Panel
          </button>
        </form>

        <div className="admin-login-footer">
          <Link to="/" className="back-to-site-link">
            <FaArrowLeft /> Back to Main Website
          </Link>
        </div>
      </div>
    </div>
  );
}
