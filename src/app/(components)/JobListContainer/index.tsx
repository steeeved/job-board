import JobList from "@/app/(components)/JobList";
import { getJobs } from "@/state/serverFetching";
import { SearchParams } from "@/state/api";

const JobListContainer = async ({ searchParams }: SearchParams) => {
  const { jobs, error } = await getJobs(searchParams as any);

  if (error) return <div>Failed to load jobs: {error}</div>;
  if (!jobs || jobs.length === 0) return <div>No jobs found.</div>;

  // must do this because in nextjs
  // the data passed from server to client as props must be serializable (like it would be in a json response)
  const serializableJobs = JSON.parse(JSON.stringify(jobs));
  return <JobList jobs={serializableJobs} />;
};

export default JobListContainer;
