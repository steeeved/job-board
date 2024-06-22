import { Router } from "express";
import { getCoverLetters } from "../controllers/coverLetterController";

const router = Router();

router.get("/:userId", getCoverLetters);

export default router;
