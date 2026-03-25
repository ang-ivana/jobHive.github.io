import logoWhite from "../assets/images/logo-white.svg";
import logoBlack from "../assets/images/logo-black.svg";
import { useEffect, useState } from "react";
import Button from "./Button";

export default function Header({ isWhiteTheme, setIsWhiteTheme, onNavigate, onOpenTracker }) {
  // // Tracks dark or light mode
  // const [isWhiteTheme, setIsWhiteTheme] = useState(
  //   document.body.classList.contains("white-theme")
  // );
  // Tracks if user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(
    document.body.classList.contains("logged-in")
  );
  // Controls visibility of login/signup modal
  const [showModal, setShowModal] = useState(false);
  // Determines if modal mode is 'login' or 'signup'
  const [authMode, setAuthMode] = useState("login");
  // Controls profile dropdown visibility
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  // Stores form data dynamically
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    jobDescription: ""
  });

  // Fake user
  const user = {
    name: "John Doe",
    email: "john@doe.com"
  };
  // Add white theme to body
  // useEffect(() => {
  //   if (isWhiteTheme) {
  //     document.body.classList.add("white-theme");
  //   } else {
  //     document.body.classList.remove("white-theme");
  //   }
  // }, [isWhiteTheme]); //Only runs when isWhiteTheme changes

  //Add logged in class to body
  useEffect(() => {
    if (isLoggedIn) {
      document.body.classList.add("logged-in");
    } else {
      document.body.classList.remove("logged-in");
    }
  }, [isLoggedIn]); //Only runs when isLoggedIn changes

  //Toggle theme funcion
  const toggleTheme = () => {
    setIsWhiteTheme(prev => !prev);
  }

  //Open modal
  const openModal = (mode) => {
    setAuthMode(mode);
    setShowModal(true);
  }
  //Handle from data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev, //Keep existing data
      [name]: value //Update if data in field is changed
    }));
  };

  //Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault(); //Prevents page reload
    console.log("Form Data:", formData);
    setIsLoggedIn(true); //Mark user as logged in
    setShowModal(false); //Close modal
  };

  //Logout
  const handleLogout = () => {
    setIsLoggedIn(false); //Remove login state
    setShowProfileMenu(false); //Close dropdown
  }
  //Switch logos based on mode
  const logo = isWhiteTheme ? logoBlack : logoWhite;
  //JSX Return
  return (
    <>
      <header className="header main-padding">
        <a href="/" className="logo">
          <img src={logo} alt="jobHive logo" />
        </a>
        <nav className="nav-links">
          <button onClick={() => onNavigate("remote")}>remote</button>
          <button onClick={() => onNavigate("onsite")}>onsite</button>
          <button onClick={() => onNavigate("hybrid")}>hybrid</button>
          <button onClick={onOpenTracker}>tracker</button>
        </nav>
        <div className="header-actions">
          <div className="mode">
            <span>mode</span>
            <button className="theme-btn" aria-label="switch theme" onClick={toggleTheme}>
              <span className={isWhiteTheme ? "dark-btn" : "light-btn"}></span>
            </button>
          </div>
          {!isLoggedIn && (
            <div className="auth-buttons">
              <Button variant="primary" text="login" onClick={() => openModal("login")} />
              <Button variant="secondary" text="signup" onClick={() => openModal("signup")} />
            </div>
          )}
          {isLoggedIn && (
            <div className="profile">
              <div className="profile-trigger" onClick={() => setShowProfileMenu(prev => !prev)}>
                <span>{formData.fullName}</span>
                <p>{formData.jobDescription}</p>
              </div>
              {showProfileMenu && (
                <div className="profile-dropdown">
                  <a href="#">dashboard</a>
                  <a href="#">settings</a>
                  <Button variant="secondary" text="logout" onClick={handleLogout} />
                </div>
              )}
            </div>
          )}
        </div>
      </header>
      {showModal && (
        <div className="modal-overlay main-padding">
          <div className="modal">
            <h2>{authMode === "login" ? "login" : "create account"}</h2>
            <form onSubmit={handleSubmit}>
              {authMode === "signup" && (
                <input type="text" name="fullName" placeholder="full name" value={formData.fullName} onChange={handleChange} required />
              )}
              <input type="email" name="email" placeholder="email" value={formData.email} onChange={handleChange} required />
              <input type="password" name="password" placeholder="password" value={formData.password} onChange={handleChange} required />
              {authMode === "signup" && (
                <input type="text" name="jobDescription" placeholder="job description" value={formData.jobDescription} onChange={handleChange} required />
              )}
              <div className="btns-container">
                <button type="submit" className="btn primary-btn">
                  <div className="btn-inside">
                    <span>{authMode === "login" ? "login" : "signup"}</span>
                    <span>{authMode === "login" ? "login" : "signup"}</span>
                  </div>
                </button>
                <Button variant="secondary" text="close" onClick={() => setShowModal(false)} />
              </div>

            </form>
          </div>
        </div>
      )}
    </>
  )

}
