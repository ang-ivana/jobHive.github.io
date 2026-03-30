import Button from "./Button";
export default function JobCard({ jobs, onApply }) {
  return (
    <div className="jobs-card">
      <h3>{jobs.title}</h3>
      <p className="company">{jobs.company}</p>
      <p className="location">{jobs.location}</p>
      <p className="salary">{jobs.salary}</p>
      <Button text="Apply" variant="primary" onClick={() => onApply && onApply(jobs)} />
    </div>
  );
}