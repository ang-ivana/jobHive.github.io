import logoWhite from "../assets/images/logo-white.svg";
import logoBlack from "../assets/images/logo-black.svg";
import { useState } from "react";
import Button from "./Button";

export default function Header({ isWhiteTheme, setIsWhiteTheme, onNavigate, onOpenTracker, user, logout, onLoginClick, onSignupClick }) {
  // Controls profile dropdown visibility
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  //Toggle theme funcion
  const toggleTheme = () => {
    setIsWhiteTheme(prev => !prev);
  }
  //Switch logos based on mode
  const logo = isWhiteTheme ? logoBlack : logoWhite;
  // Tracks if user is logged in
  // const [isLoggedIn, setIsLoggedIn] = useState(
  //   document.body.classList.contains("logged-in")
  // );
  // Controls visibility of login/signup modal
  // const [showModal, setShowModal] = useState(false);
  // Determines if modal mode is 'login' or 'signup'
  // const [authMode, setAuthMode] = useState("login");


  // Stores form data dynamically
  // const [formData, setFormData] = useState({
  //   fullName: "",
  //   email: "",
  //   password: "",
  //   jobDescription: ""
  // });

  // Fake user
  // const user = {
  //   name: "John Doe",
  //   email: "john@doe.com"
  // };
  // Add white theme to body
  // useEffect(() => {
  //   if (isWhiteTheme) {
  //     document.body.classList.add("white-theme");
  //   } else {
  //     document.body.classList.remove("white-theme");
  //   }
  // }, [isWhiteTheme]); //Only runs when isWhiteTheme changes

  //Add logged in class to body
  // useEffect(() => {
  //   if (isLoggedIn) {
  //     document.body.classList.add("logged-in");
  //   } else {
  //     document.body.classList.remove("logged-in");
  //   }
  // }, [isLoggedIn]); //Only runs when isLoggedIn changes



  //Open modal
  // const openModal = (mode) => {
  //   setAuthMode(mode);
  //   setShowModal(true);
  // }
  // //Handle from data
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData(prev => ({
  //     ...prev, //Keep existing data
  //     [name]: value //Update if data in field is changed
  //   }));
  // };

  //Handle form submit
  // const handleSubmit = (e) => {
  //   e.preventDefault(); //Prevents page reload
  //   console.log("Form Data:", formData);
  //   setIsLoggedIn(true); //Mark user as logged in
  //   setShowModal(false); //Close modal
  // };

  // //Logout
  // const handleLogout = () => {
  //   setIsLoggedIn(false); //Remove login state
  //   setShowProfileMenu(false); //Close dropdown
  // }


  //JSX Return
  return (
    <header className="header main-padding">
      <a href="/" className="logo">
        <img src={logo} alt="jobHive logo" />
      </a>
      <nav className="nav-links">
        <button onClick={() => onNavigate("remote")}>remote</button>
        <button onClick={() => onNavigate("onsite")}>onsite</button>
        <button onClick={() => onNavigate("hybrid")}>hybrid</button>
        <button onClick={onOpenTracker} className="tracker">tracker</button>
      </nav>
      <div className="header-actions">
        <div className="mode">
          <span>mode</span>
          <button className="theme-btn" aria-label="switch theme" onClick={toggleTheme}>
            <span className={isWhiteTheme ? "dark-btn" : "light-btn"}></span>
          </button>
        </div>
        {!user && (
          <div className="auth-buttons">
            <Button variant="primary" text="login" onClick={onLoginClick} />
            <Button variant="secondary" text="signup" onClick={onSignupClick} />
          </div>
        )}
        {user && (
          <div className="profile">
            <div className="profile-trigger">
              <span>{user.fullName}</span>
              <p>{user.jobDescription}</p>
            </div>
            <Button variant="secondary" text="logout" onClick={logout} />
          </div>
        )}
      </div>
    </header>
  )

}
