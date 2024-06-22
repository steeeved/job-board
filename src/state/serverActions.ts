"use server";

import * as z from "zod";
import { createSafeActionClient } from "next-safe-action";
import { revalidatePath } from "next/cache";
import Job from "../models/jobModel";
import Resume from "../models/resumeModel";
import CoverLetter from "../models/coverLetterModel";
import { v4 as uuidv4 } from "uuid";

/* 
==============================
SCHEMAS
==============================
*/
const jobSchema = z.object({
  title: z.string(),
  company: z.string(),
  companyLogo: z.string().optional(),
  description: z.string(),
  longDescription: z.string().optional(),
  location: z.string(),
  employmentType: z.string(),
  salaryRange: z.string().optional(),
  postedByUserId: z.string(),
  specialties: z.array(z.string()).optional(),
  availability: z.string().optional(),
});

const resumeSchema = z.object({
  userId: z.string(),
  resumeUrl: z.string(),
  fileName: z.string(),
});

const coverLetterSchema = z.object({
  userId: z.string(),
  title: z.string(),
  content: z.string(),
});

/* 
==============================
SERVER ACTIONS
==============================
*/
export const action = createSafeActionClient();

export const addJob = action(
  jobSchema,
  async ({
    title,
    company,
    companyLogo,
    description,
    longDescription,
    location,
    employmentType,
    salaryRange,
    postedByUserId,
    specialties,
    availability,
  }: z.infer<typeof jobSchema>) => {
    try {
      const newJob = new Job({
        jobId: uuidv4(),
        title,
        company,
        companyLogo,
        description,
        longDescription,
        location,
        employmentType,
        salaryRange,
        postedByUserId,
        specialties,
        availability,
        applicationCount: 0,
      });

      await newJob.save();
      revalidatePath("/jobs");

      return { success: "Successfully added a job" };
    } catch (error: unknown) {
      console.error("error:", error);

      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      return { error: "Failed to add job: " + errorMessage };
    }
  }
);

export const uploadResume = action(
  resumeSchema,
  async ({ userId, resumeUrl, fileName }: z.infer<typeof resumeSchema>) => {
    try {
      const newResume = new Resume({
        resumeId: uuidv4(),
        userId,
        resumeUrl,
        fileName,
      });
      await newResume.save();
      revalidatePath("/settings");

      return { success: "Succesfully uploaded resume" };
    } catch (error: unknown) {
      console.error("error:", error);

      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      return { error: "Failed to upload resume: " + errorMessage };
    }
  }
);

export const createCoverLetter = action(
  coverLetterSchema,
  async ({ userId, title, content }: z.infer<typeof coverLetterSchema>) => {
    try {
      const newCoverLetter = new CoverLetter({
        coverLetterId: uuidv4(),
        userId,
        title,
        content,
      });
      await newCoverLetter.save();
      revalidatePath("/settings");

      return { success: "Successfully created cover letter" };
    } catch (error: unknown) {
      console.error("error:", error);

      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      return { error: "Failed to create cover letter: " + errorMessage };
    }
  }
);
