import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import Footer from './components/Footer'
import JobsContainer from "./components/JobsContainer";
import { useAuth } from './hooks/useAuth';
import Tracker from './components/Tracker';
import { useEffect, useState, useRef } from 'react'
function App() {
  const { user, login, singup, logout, applyToJob } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [showTracker, setShowTracker] = useState(false);
  const handleApply = (job) => {
    if (!user) {
      setShowModal(true);
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
            appliedJobs: []
          }
        ]
      };

      localStorage.setItem("users", JSON.stringify(initialData));
    }
  }, []);
  const [activeSection, setActiveSection] = useState(null);
  const sectionsRef = {
    remote: useRef(null),
    onsite: useRef(null),
    hybrid: useRef(null)
  };
  const handleNavigate = (section) => {
    setActiveSection(section);
    sectionsRef[section].current?.scrollIntoView({
      behaviour: "smooth",
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
      <Header onNavigate={handleNavigate} isWhiteTheme={isWhiteTheme} setIsWhiteTheme={setIsWhiteTheme} user={user} logout={logout} onOpenTracker={() => setShowTracker(true)} />
      <main>
        <Hero />
        <div className='job-sections-container'>
          <JobsContainer activeSection={activeSection} setActiveSection={setActiveSection} sectionsRef={sectionsRef} onApply={handleApply} />
        </div>
        {showTracker && (
          <Tracker user={user} onClose={() => setShowTracker(false)} />
        )}
      </main>
      <Footer isWhiteTheme={isWhiteTheme} />
    </>
  )
}

export default App
