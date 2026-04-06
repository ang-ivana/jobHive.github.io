import JobCard from "./JobCard";
import { useSlider } from "../hooks/useSlider";
import { useResize } from "../hooks/useResize";
import arrow from "../assets/images/arrow.svg";

export default function JobSlider({ jobs = [], onApply }) {
  const { slides } = useResize();
  const { index, next, prev } = useSlider(jobs.length || 0);
  const visibleJobs = jobs.slice(index, index + slides);

  return (
    <div className="slider">
      <button className="prev" onClick={prev}><img src={arrow} alt="arrow" /></button>
      {visibleJobs.length === 0 ? (
        <p>No jobs availeble.</p>
      ) : (
        <div className="slider-track">
          {visibleJobs.map(job => (<JobCard key={job.id} job={job} onApply={onApply} />))}
        </div>)}

      <button className="next" onClick={next}><img src={arrow} alt="arrow" /></button>
    </div>
  );
}