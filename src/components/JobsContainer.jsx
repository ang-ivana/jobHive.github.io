import { useJobs } from "../hooks/useJobs";
import JobSection from "./JobSection";
export default function JobsContainer({ activeSection, setActiveSection, sectionsRef }) {
  const { jobs } = useJobs();
  if (!jobs) return <p>Loading jobs...</p>
  return (
    <>
      <JobSection id="remote" title="Remote Jobs" jobs={jobs.remote} activeSection={activeSection}
        setActiveSection={setActiveSection} refProp={sectionsRef.remote} />
      <JobSection title="Onsite Jobs" jobs={jobs.onsite} id="onsite" activeSection={activeSection}
        setActiveSection={setActiveSection} refProp={sectionsRef.onsite} />
      <JobSection title="Hybrid Jobs" jobs={jobs.hybrid} id="hybrid" activeSection={activeSection}
        setActiveSection={setActiveSection} refProp={sectionsRef.hybrid} />
    </>
  );
}