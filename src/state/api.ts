import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type SearchParams = {
  [key: string]: string | string[] | undefined;
};

interface UserParams {
  userId: string;
}

interface JobDetailsParams {
  jobId: string;
}

interface ApplicationRequest {
  jobId: string;
  applicantUserId: string;
  coverLetter: string;
  resumeId: string;
}

export interface Job {
  jobId: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  employmentType: string;
  availability: string;
  salaryRange: string;
  description: string;
  specialties: string[];
  postedDate: string;
}
export type Jobs = Job[];

interface JobDetails {
  jobId: string;
  title: string;
  company: string;
  companyLogo: string;
  description: string;
  longDescription: string;
  location: string;
  employmentType: string;
  salaryRange: string;
  postedDate: string;
  postedByUserId: string;
  applicationCount: number;
  specialties: string[];
  availability: string;
}

interface Application {
  success: boolean;
  applicationId: string;
  jobId: string;
  applicantUserId: string;
  coverLetter: string;
  resumeUrl: string;
  applicationDate: string;
}

interface User {
  userId: string;
  userName: string;
  userEmail: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface CoverLetter {
  coverLetterId: string;
  userId: string;
  title: string;
  content: string;
  creationDate?: string;
  isActive?: boolean;
}
type CoverLetters = CoverLetter[];

export interface Resume {
  resumeId: string;
  userId: string;
  resumeUrl: string;
  fileName: string;
  uploadDate?: string;
  isActive?: boolean;
}
type Resumes = Resume[];

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  tagTypes: ["Jobs", "Applications", "Users", "Resumes", "CoverLetters"],
  endpoints: (build) => ({
    getJobDetails: build.query<JobDetails, JobDetailsParams>({
      query: ({ jobId }) => ({ url: `/jobs/${jobId}` }),
      providesTags: ["Jobs"],
    }),
    getUser: build.query<User, UserParams>({
      query: ({ userId }) => ({ url: `/users/${userId}` }),
      providesTags: ["Users"],
    }),
    getResumes: build.query<Resumes, UserParams>({
      query: ({ userId }) => ({ url: `/resumes/${userId}` }),
      providesTags: ["Resumes"],
    }),
    getCoverLetters: build.query<CoverLetters, UserParams>({
      query: ({ userId }) => ({ url: `/coverLetters/${userId}` }),
      providesTags: ["CoverLetters"],
    }),
    // Note: this could be a server action for code simplicity, however,
    // this is just to show you how to use rtk query mutations
    submitApplication: build.mutation<Application, ApplicationRequest>({
      query: (application) => ({
        url: "/applications",
        method: "POST",
        body: application,
      }),
      invalidatesTags: ["Applications"],
    }),
  }),
});

export const {
  useGetJobDetailsQuery,
  useGetUserQuery,
  useGetResumesQuery,
  useGetCoverLettersQuery,
  useSubmitApplicationMutation,
} = api;
