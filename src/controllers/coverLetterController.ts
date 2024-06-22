import { Request, Response } from "express";
import CoverLetter from "../models/coverLetterModel";

export const getCoverLetters = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.params;
  try {
    const coverLetters = await CoverLetter.scan({ userId }).exec();
    res.json(coverLetters);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving cover letters" });
  }
};
