import { Router } from "express";
import { getResumes } from "../controllers/resumeController";

const router = Router();

router.get("/:userId", getResumes);

export default router;
