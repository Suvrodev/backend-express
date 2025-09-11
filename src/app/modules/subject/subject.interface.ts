import { Model, Types } from "mongoose";

export type TSubject = {
  name: string;
  language: string;
  studentId: Types.ObjectId;
};
