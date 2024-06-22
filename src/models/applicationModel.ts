import { Schema, model } from "dynamoose";
import CoverLetter from "./coverLetterModel";

const applicationSchema = new Schema(
  {
    applicationId: {
      type: String,
      hashKey: true,
    },
    jobId: {
      type: String,
      required: true,
    },
    applicantUserId: {
      type: String,
      required: true,
    },
    resumeId: {
      type: String,
      required: true,
    },
    coverLetter: {
      type: String,
      required: true,
    },
  },
  {
    saveUnknown: true,
    timestamps: true,
  }
);

const Application = model("Application", applicationSchema);
export default Application;
