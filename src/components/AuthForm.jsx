import { useState } from "react";
export default function AuthForm({ authMode, login, signup, onClose }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    jobDescription: ""
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let success;
    if (authMode === "login") {
      success = login(formData.email, formData.password);
      if (!success) {
        alert("Invalid email or password!");
        return;
      }
    } else {
      success = signup(formData);
      if (!success) {
        alert("User already exists");
        return;
      }
    }
    onClose();
  }
  return (
    <form onSubmit={handleSubmit}>
      {authMode === "signup" && (
        <input name="fullName" placeholder="Full Name" onChange={handleChange} required />
      )}
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      {authMode === "login" && (
        <button className="btn secondary-btn change-pass" type="button" onClick={() => { onClose(); window.dispatchEvent(new Event("openChangePassword")) }}>
          Change Password</button>
      )}
      {authMode === "signup" && (
        <input name="jobDescription" placeholder="Job Description" onChange={handleChange} required />
      )}
      <button type="submit" className="btn primary-btn">{authMode === "login" ? "Login" : "Signup"}</button>
      <button type="button" className="btn secondary-btn" onClick={onClose}>Close</button>

    </form>
  )
}