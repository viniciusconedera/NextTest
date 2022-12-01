import { useEffect, useRef, useState } from "react";
import { Job, JobSummary } from "./jobs";

interface UseJobs {
  initialJobs: Array<JobSummary>
  page?: number;
  jobTitle?: string;
  company?: string;
}

export function useJobs({initialJobs, page, jobTitle, company}: UseJobs) {
  const [jobs, setJobs] = useState<Array<JobSummary>>(initialJobs);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const isFirstRef = useRef(true);

  useEffect(() => {
    if (isFirstRef.current === true) {
      isFirstRef.current = false;
      return
    }
    setLoading(true);
    setError(false);
    let query = [];
    if (page) {
      query.push(`page=${page}`);
    }
    if (jobTitle) {
      query.push(`jobTitle=${encodeURIComponent(jobTitle)}`);
    }
    if (company) {
      query.push(`company=${encodeURIComponent(company)}`)
    }
    let isCurrentRequest = true;
    fetch(`/api/jobs?${query.join('&')}`)
    .then((res) => res.json())
    .then((jobs) => {
      setJobs(jobs.map((job: Job) => ({
        ...job, date: new Date(job.date)
      })));
    })
    .catch((err) => {
      if (isCurrentRequest) {
        console.error(err);
        setError(err);
      }      
    })
    .finally(() => {
      if (isCurrentRequest) {
        setLoading(false);
      }      
    });
    return () => {
      isCurrentRequest = false;
    }
  }, [company, jobTitle, page]);

  return {jobs, loading, error};
}