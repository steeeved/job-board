import { Request, Response } from "express";
import Resume from "../models/resumeModel";

export const getResumes = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.params;
  try {
    const resumes = await Resume.scan({ userId }).exec();
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving resumes" });
  }
};
