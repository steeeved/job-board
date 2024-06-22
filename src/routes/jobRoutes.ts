import { Router } from "express";
import { getJobDetails } from "../controllers/jobController";

const router = Router();

router.get("/:jobId", getJobDetails);

export default router;
