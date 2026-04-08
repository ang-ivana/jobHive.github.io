import { useState } from "react";
import Button from "./Button";
export default function ChangePasswordModal({ onClose }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
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
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    const stored = JSON.parse(localStorage.getItem("users"));
    const userIndex = stored.users.findIndex(u => u.email === formData.email);
    if (userIndex === -1) {
      alert("User not found!");
      return;
    }
    stored.users[userIndex].password = formData.password;
    localStorage.setItem("users", JSON.stringify(stored));
    alert("Password changed successfully!");
    onClose();

  };
  return (
    <div className="modal-overlay main-padding">
      <div className="modal">
        <h2>Change Password</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="New Password" onChange={handleChange} required />
          <input type="password" name="confirmPassword" placeholder="Confirm password" onChange={handleChange} required />
          <button type="submit" className="btn primary-btn">Change Password</button>
          <Button variant="secondary" onClick={onClose} text="Close" />
        </form>
      </div>
    </div>
  )

}