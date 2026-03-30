import Button from "./Button";
export default function Tracker({ user, onClose }) {
  const jobs = user?.appliedJobs || [];
  if (!user) return null;
  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Applied Jobs</h2>
        {jobs.length === 0 && (
          <p>No applications yet.</p>
        )}
        {jobs.map(job => (
          <div className="popup-card" key={job.id}>
            <h3>{job.title}</h3>
            <span>{job.company}</span>
            <p>Applied on:{""} {new Date(job.appliedAt).toLocaleDateString()}</p>
          </div>
        ))}
        <Button variant="secondary" onClick={onClose} text={"Close"} />
      </div>
    </div>
  );
}