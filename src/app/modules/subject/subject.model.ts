import { model, Schema } from "mongoose";
import { TSubject } from "./subject.interface";

const subjectSchema = new Schema<TSubject>(
  {
    name: {
      type: String,
      required: [true, "Subject Name is required"],
      unique: true,
    },
    language: { type: String, required: [true, "Language is required"] },
    studentId: {
      type: Schema.Types.ObjectId,
      required: [true, "Student id is required"],
      ref: "student",
    },
  },
  {
    timestamps: true,
    strict: "throw",
  }
);

export const SubjectModel = model<TSubject>("subject", subjectSchema);
