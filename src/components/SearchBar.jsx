import { useEffect, useState } from "react";
import Button from "./Button";

export default function SearchBar({ onApply }) {
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch("/data/jobs.json").then(res => res.json()).then(data => {
      const allJobs = Object.values(data).flat();
      setJobs(allJobs);
    });
  }, [])



  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    const filtered = jobs.filter(job =>
      job.title.toLowerCase().includes(query.toLowerCase()) ||
      job.company.toLowerCase().includes(query.toLowerCase())
    );
    setSuggestions(filtered.slice(0, 5));
  }, [query, jobs]);
  return (
    <div className="search-wrapper">
      <input type="text" placeholder="Search for your hive..." value={query}
        onChange={(e) => setQuery(e.target.value)} />
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map(job => (
            <li key={job.id} onClick={() => setSelected(job)}>
              <span>{job.title}</span>
              <div className="job-info">
                <p>{job.company}</p>
                <p className="job-location">{job.location}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
      {selected && (
        <div className="popup">
          <div className="popup-content">
            <h2>{selected.title}</h2>
            <span>company | <p>{selected.company}</p></span>
            <span>location | <p>{selected.location}</p></span>
            <span>salary | <p>{selected.salary}</p></span>
            <span className="popup-date">posted | <p>{selected.date}</p></span>
            <Button text="Apply" variant="apply-btn primary" onClick={() => { onApply && onApply(selected); setSelected(null) }} />
            <Button text="close" variant="secondary" onClick={() => setSelected(null)} />
          </div>
        </div>
      )}
    </div>
  )
}