import JobSlider from "./JobSlider";
import Button from "./Button";
export default function JobSection({ title, jobs, id, activeSection, setActiveSection, refProp, onApply }) {
  const isActive = activeSection === id;
  return (
    <section className={`job-section main-padding ${isActive ? "active-section" : ""}`} ref={refProp} >

      <Button variant={`${isActive ? "active-btn" : "show"}`} text={`View ${title}`} onClick={() => setActiveSection(id)} />

      {isActive && <JobSlider jobs={jobs} onApply={onApply} />}
    </section >
  );
}