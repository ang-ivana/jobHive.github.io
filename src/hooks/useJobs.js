import { useEffect, useState } from "react";

export function useJobs() {
  const [jobs, setJobs] = useState(null);

  useEffect(() => {
    fetch("/data/jobs.json").then(res => res.json()).then(data => setJobs(data));
  }, []);
  return { jobs };
}