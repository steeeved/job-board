import * as z from "zod";
import Job from "../models/jobModel";

const jobsSchema = z.object({
  title: z.string().optional(),
  location: z.string().optional(),
  employmentType: z.string().optional(),
  salaryRange: z.string().optional(),
  specialties: z.string().optional(),
  availability: z.string().optional(),
});

/* 
==============================
SERVER FETCHING
==============================
*/
export const getJobs = async (filters: z.infer<typeof jobsSchema>) => {
  try {
    let scan = Job.scan();

    if (filters.title) {
      scan = scan.where("title").contains(filters.title);
    }

    if (filters.employmentType) {
      const types = filters.employmentType.split(",");
      scan = scan.where("employmentType").in(types);
    }

    if (filters.availability) {
      const availabilities = filters.availability.split(",");
      scan = scan.where("availability").in(availabilities);
    }

    const jobsFromDb = await scan.exec();

    /*
      sometimes you have to do post filtering, but ideally you want to set up data you can query directly
      if you don't set up data correctly, you can messy post filtering like this
     */
    const isSalaryInRange = (
      jobSalaryRange: string,
      userSalary: string
    ): boolean => {
      const regex = /\$([\d,]+)/g;
      const jobMatches = jobSalaryRange.match(regex);
      const userRange = userSalary.split("-").map(Number);

      if (jobMatches && jobMatches.length === 2 && userRange.length === 2) {
        const jobRange = jobMatches.map((s) =>
          parseInt(s.replace(/[\$,]/g, ""), 10)
        );
        const [userMin, userMax] = userRange;
        const [jobMin, jobMax] = jobRange;
        return !(userMax < jobMin || userMin > jobMax);
      }
      return false;
    };

    const filteredJobs = jobsFromDb.filter((job) => {
      const salaryMatch = filters.salaryRange
        ? isSalaryInRange(job.salaryRange, filters.salaryRange)
        : true;
      const specialtiesMatch = filters.specialties
        ? job.specialties?.includes(filters.specialties)
        : true;
      return salaryMatch && specialtiesMatch;
    });

    return { jobs: filteredJobs };
  } catch (error: unknown) {
    console.error("error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return { error: "Failed to get jobs: " + errorMessage };
  }
};
