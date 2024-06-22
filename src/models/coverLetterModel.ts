import { Schema, model } from "dynamoose";

const coverLetterSchema = new Schema(
  {
    coverLetterId: {
      type: String,
      hashKey: true,
    },
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  {
    saveUnknown: true,
    timestamps: true,
  }
);

const CoverLetter = model("CoverLetter", coverLetterSchema);
export default CoverLetter;
