import { Request, Response } from "express";
import Application from "../models/applicationModel";
import { v4 as uuidv4 } from "uuid";

export const submitApplication = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { jobId, applicantUserId, coverLetter, resumeId } = req.body;

  try {
    const newApplication = new Application({
      applicationId: uuidv4(),
      jobId,
      applicantUserId,
      coverLetter,
      resumeId,
    });
    await newApplication.save();
    res
      .status(201)
      .json({ success: true, applicationId: newApplication.applicationId });
  } catch (error) {
    console.error("Error submitting application:", error);
    res.status(500).json({ message: "Error submitting application" });
  }
};
