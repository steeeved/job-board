import { Request, Response } from "express";
import Job from "../models/jobModel";

export const getJobDetails = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { jobId } = req.params;
  try {
    const job = await Job.get(jobId);
    res.json(job);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error retrieving job details for jobId: ${jobId}` });
  }
};
