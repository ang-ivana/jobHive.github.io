import Button from "./Button";
export default function Tracker({ user, onClose, onRemove }) {
  if (!user) return null;
  const jobs = user?.appliedJobs || [];
  console.log(user)
  return (
    <div className="popup main-padding popup-tracker">
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
            <Button text="Remove" variant="secondary" onClick={() => { onRemove(job.id) }} />
          </div>
        ))}

        <Button variant="close-btn secondary" onClick={onClose} text={"Close"} />

      </div>
    </div>
  );
}