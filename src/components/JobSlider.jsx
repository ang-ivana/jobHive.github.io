import JobCard from "./JobCard";
import { useSlider } from "../hooks/useSlider";
import { useResize } from "../hooks/useResize";
import arrow from "../assets/images/arrow.svg";

export default function JobSlider({ jobs = [], onApply }) {
  const { slides } = useResize();
  const safeLength = jobs.length || 0;
  const { index, next, prev } = useSlider(safeLength);
  const visibleJobs = jobs.slice(index, index + slides);
  console.log("JobsSlider jobs:", jobs);
  return (
    <div className="slider">
      <button className="prev" onClick={prev}><img src={arrow} alt="arrow" /></button>
      {visibleJobs.length === 0 ? (
        <p>No jobs availeble.</p>
      ) : (
        <div className="slider-track">
          {visibleJobs.map(jobs => (<JobCard key={jobs.id} jobs={jobs} onApply={onApply} />))}
        </div>)}

      <button className="next" onClick={next}><img src={arrow} alt="arrow" /></button>
    </div>
  );
}