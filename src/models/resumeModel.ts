import { Schema, model } from "dynamoose";

const resumeSchema = new Schema(
  {
    resumeId: {
      type: String,
      hashKey: true,
    },
    userId: {
      type: String,
      required: true,
    },
    resumeUrl: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
  },
  {
    saveUnknown: true,
    timestamps: true,
  }
);

const Resume = model("Resume", resumeSchema);
export default Resume;
