import { Schema, model } from "dynamoose";

const userSchema = new Schema(
  {
    userId: {
      type: String,
      hashKey: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
      index: {
        name: "EmailIndex",
        type: "global",
      },
    },
    role: {
      type: String,
      required: true,
      enum: ["applicant", "employer"],
    },
  },
  {
    saveUnknown: true,
    timestamps: true,
  }
);

const User = model("User", userSchema);
export default User;
