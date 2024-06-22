"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useGetJobDetailsQuery } from "@/state/api";
import { useAppSelector } from "@/app/redux";
import ReactMarkdown from "react-markdown";
import ApplicationModal from "@/app/(components)/ApplicationModal";
import { useState } from "react";
import Case from "../../../../public/Icons/case";
import Dollar from "../../../../public/Icons/dollar";
import HomeIcon from "../../../../public/Icons/home";
import Applicants from "../../../../public/Icons/applicants";
import { SendHorizontal } from "lucide-react";

const JobDetails = () => {
  const selectedJobId = useAppSelector((state) => state.global.selectedJobId);
  const {
    data: job,
    isLoading,
    isError,
  } = useGetJobDetailsQuery({ jobId: selectedJobId! });
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !job) return <div>Job details not available.</div>;

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Card className="w-full h-fit p-4 bg-gray-50 dark:bg-gray-800 shadow">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar className="w-10 h-10 rounded-lg">
            <AvatarImage src={job.companyLogo} alt={`${job.company} logo`} />
            <AvatarFallback>{job.company[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-xl font-bold text-gray-700 dark:text-gray-200">
              {job.title}
            </p>
            <Link href={`/companies/${job.company}`}>
              <p className="text-lg cursor-pointer text-primary">
                {job.company}
              </p>
            </Link>
            <p className="text-sm text-gray-300">{job.location}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mt-2 text-gray-700 dark:text-gray-200 text-base">
          {job.description}
        </p>
        <div className="flex flex-col mt-4">
          <div className="flex items-center gap-2">
            <Dollar width={16} height={16} />
            <p className="text-gray-700 dark:text-gray-200 text-base">
              {job.salaryRange}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Case width={16} height={16} />
            <p className="text-gray-700 dark:text-gray-200 text-base">
              {job.employmentType}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <HomeIcon width={16} height={16} />
            <p className="text-gray-700 dark:text-gray-200 text-base">
              {job.availability}
            </p>
          </div>
        </div>
        <div className="flex gap-[18px] my-5">
          <Button
            className="w-36 h-[50px] bg-blue-100 uppercase p-4 rounded-[17px] text-base font-semibold hover:bg-blue-800  dark:text-gray-200"
            onClick={handleModalOpen}
          >
            Apply Now
          </Button>
          <Button className="w-36 min-h-[50px] bg-black dark:bg-white p-4 rounded-[17px] text-base font-semibold flex gap-2 hover:bg-black dark:hover:bg-white">
            <span className=" text-gray-1 dark:text-black gap-0 font-semibold">
              Applicants: {job.applicationCount}
            </span>
          </Button>
        </div>
        <ReactMarkdown className="mt-2 prose prose-lg text-gray-700 dark:text-gray-200 text-base">
          {job.longDescription}
        </ReactMarkdown>
      </CardContent>
      <ApplicationModal isOpen={isModalOpen} onClose={handleModalClose} />
    </Card>
  );
};

export default JobDetails;
