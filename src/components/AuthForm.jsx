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
    } else {
      success = signup(formData);
    }
    if (!success) {
      alert("Something went wrong, try again!");
      return;
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
      {authMode === "signup" && (
        <input name="jobDescription" placeholder="Job Description" onChange={handleChange} required />
      )}
      <button type="submit" className="btn primary-btn">{authMode === "login" ? "Login" : "Signup"}</button>
      <button type="button" className="btn secondary-btn" onClick={onClose}>Close</button>
    </form>
  )
}