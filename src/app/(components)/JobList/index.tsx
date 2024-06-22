"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setSelectedJobId } from "@/state";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Jobs } from "@/state/api";
import { CircleDollarSign } from "lucide-react";
import Case from "../../../../public/Icons/case";
import Dollar from "../../../../public/Icons/dollar";

const JobList = ({ jobs }: { jobs: Jobs }) => {
  const dispatch = useAppDispatch();
  const {
    selectedJobType,
    selectedSalaryRange,
    selectedSpecialties,
    selectedAvailability,
    searchLocation,
  } = useAppSelector((state) => state.global);
  const selectedJobId = useAppSelector((state) => state.global.selectedJobId);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesJobType =
        !selectedJobType.length ||
        selectedJobType?.includes(job.employmentType);
      const matchesSalaryRange =
        !selectedSalaryRange.length ||
        (parseInt(job.salaryRange.split("-")[0].replace(/[^0-9]/g, "")) >=
          selectedSalaryRange[0] &&
          parseInt(job.salaryRange.split("-")[1].replace(/[^0-9]/g, "")) <=
            selectedSalaryRange[1]);
      const matchesSpecialties =
        !selectedSpecialties.length ||
        selectedSpecialties.every((spec) => job.specialties?.includes(spec));
      const matchesAvailability =
        !selectedAvailability.length ||
        selectedAvailability?.includes(job.availability);
      const matchesLocation =
        !searchLocation || job.location?.includes(searchLocation);

      return (
        matchesJobType &&
        matchesSalaryRange &&
        matchesSpecialties &&
        matchesAvailability &&
        matchesLocation
      );
    });
  }, [
    jobs,
    selectedJobType,
    selectedSalaryRange,
    selectedSpecialties,
    selectedAvailability,
    searchLocation,
  ]);

  useEffect(() => {
    if (filteredJobs.length > 0 && !selectedJobId) {
      dispatch(setSelectedJobId(filteredJobs[0].jobId));
    }
  }, [filteredJobs, selectedJobId, dispatch]);

  return (
    <div className="flex flex-col w-full gap-6">
      {filteredJobs.map((job) => (
        <div
          key={job.jobId}
          onClick={() => dispatch(setSelectedJobId(job.jobId))}
          className={`rounded-xl cursor-pointer ${
            selectedJobId === job.jobId
              ? "border-2 border-gray-200 dark:border-blue-100"
              : "border-2 border-transparent"
          }`}
        >
          <Card className={`bg-gray-50 dark:bg-gray-800 pt-[23px] border-none`}>
            <CardContent className="flex flex-col">
              <div className="flex items-center gap-2">
                <Avatar className="w-10 h-10 rounded-lg">
                  <AvatarImage
                    src={job.companyLogo}
                    alt={`${job.company} logo`}
                  />
                  <AvatarFallback>{job.company[0]}</AvatarFallback>
                </Avatar>

                <div className="flex flex-col gap-1">
                  <p className="font-semibold text-[16px] text-blue-100">
                    {job.title}
                  </p>
                  <p className="font-normal text-[13px] text-gray-100">
                    {job.company}
                  </p>
                </div>
              </div>

              <p className="font-[300] text-base my-2 text-gray-700 dark:text-gray-200">
                {job.location}
              </p>

              <div className="w-full flex gap-4">
                <div className="flex bg-gray-1 items-center gap-2 rounded py-1 px-[10px]">
                  <Dollar width={16} height={16} />
                  <p className="text-gray-700">
                    {job.salaryRange.replace("per year", "/yr")}
                  </p>
                </div>
                <div className="flex bg-gray-1 items-center gap-2 rounded py-1 px-[10px]">
                  <Case />
                  <p className="text-gray-700">{job.employmentType}</p>
                </div>

                <p className="text-gray-500">{/*  -{" "} */}</p>
              </div>

              {/* <Link href={`/jobs/${job.jobId}`} passHref>
                <p className="text-blue-600 hover:underline dark:text-blue-500">
                  View Details
                </p>
              </Link> */}
            </CardContent>
            <CardFooter className="flex flex-col items-start">
              <p className="text-gray-300 text-[12px] mt-[10px]">
                {job.description.length > 100
                  ? `${job.description.substring(0, 100)}...`
                  : job.description}
              </p>
              <span className="text-gray-700 dark:text-gray-200 mt-[8px] text-start font-semibold">
                Posted on {new Date(job.postedDate).toLocaleDateString()}
              </span>
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default JobList;
