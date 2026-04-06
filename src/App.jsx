import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import Footer from './components/Footer'
import JobsContainer from "./components/JobsContainer";
import { useAuth } from './hooks/useAuth';
import Tracker from './components/Tracker';
import { useEffect, useState, useRef } from 'react'
import AuthForm from './components/AuthForm';
function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const { user, login, signup, logout, applyToJob } = useAuth();
  const [showTracker, setShowTracker] = useState(false);
  const handleApply = (job) => {
    if (!user) {
      setAuthMode("login");
      setShowAuthModal(true);
      return;
    }
    applyToJob(job);
  }
  useEffect(() => {
    const existing = localStorage.getItem("users");

    if (!existing) {
      const initialData = {
        users: [
          {
            email: "john@doe.com",
            password: "123",
            fullName: "John Doe",
            jobDescription: "Frontend Dev",
            appliedJobs: []
          }
        ]
      };

      localStorage.setItem("users", JSON.stringify(initialData));
    }
  }, []);

  useEffect(() => {
    if (user) {
      document.body.classList.add("logged-in");
    } else {
      document.body.classList.remove("logged-in");
    }
  }, [user]);

  const [activeSection, setActiveSection] = useState(null);
  const sectionsRef = {
    remote: useRef(null),
    onsite: useRef(null),
    hybrid: useRef(null)
  };
  const handleNavigate = (section) => {
    setActiveSection(section);
    sectionsRef[section].current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
  const [isWhiteTheme, setIsWhiteTheme] = useState(
    document.body.classList.contains("white-theme"));
  useEffect(() => {
    if (isWhiteTheme) {
      document.body.classList.add("white-theme");
    } else {
      document.body.classList.remove("white-theme")
    }
  }, [isWhiteTheme])
  return (
    <>
      <Header onNavigate={handleNavigate} isWhiteTheme={isWhiteTheme} setIsWhiteTheme={setIsWhiteTheme} user={user} logout={logout} onOpenTracker={() => setShowTracker(true)}
        onLoginClick={() => {
          setAuthMode("login");
          setShowAuthModal(true);
        }} onSignupClick={() => { setAuthMode("signup"); setShowAuthModal(true); }} />
      <main>
        <Hero />
        <div className='job-sections-container'>
          <JobsContainer activeSection={activeSection} setActiveSection={setActiveSection} sectionsRef={sectionsRef} onApply={handleApply} />
        </div>
        {showTracker && (
          <Tracker user={user} onClose={() => setShowTracker(false)} />
        )}
        {showAuthModal && (
          <div className='modal-overlay main-padding'>
            <div className='modal'>
              <h2>{authMode === "login" ? "Login" : "Signup"}</h2>
              <AuthForm authMode={authMode} login={login} signup={signup} onClose={() => setShowAuthModal(false)} />
            </div>
          </div>
        )}
      </main>
      <Footer isWhiteTheme={isWhiteTheme} />
    </>
  )
}

export default App
