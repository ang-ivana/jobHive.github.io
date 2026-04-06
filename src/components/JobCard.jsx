import Button from "./Button";
export default function JobCard({ job, onApply }) {
  return (
    <div className="jobs-card">
      <h3>{job.title}</h3>
      <p className="company">{job.company}</p>
      <p className="location">{job.location}</p>
      <p className="salary">{job.salary}</p>
      <Button text="Apply" variant="apply-btn primary" onClick={() => onApply && onApply(job)} />
    </div>
  );
}