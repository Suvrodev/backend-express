import mongoose from "mongoose";
import { StudentModel } from "../students/student.model";
import { TSubject } from "./subject.interface";
import { SubjectModel } from "./subject.model";
import AppError from "../../Errors/AppError";

const createSubjectIntoDB = async (student: TSubject) => {
  const res = await SubjectModel.create(student);
  return res;
};

const getAllSubjectFromDB = async () => {
  // throw new AppError(404, "Not FOund");
  const res = await SubjectModel.find().populate("studentId");
  return res;
};

const getSingleSubjectFromDB = async (id: string) => {
  const res = await SubjectModel.findOne({ _id: id }).populate("studentId");
  return res;
};

const deleteSubjectFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const getSubject = await SubjectModel.findById(id).session(session);
    if (!getSubject) {
      throw new AppError(404, "Subject Not Found");
    }
    const studentIdFromSubject = getSubject?.studentId;

    console.log("Get Subject before delete: ", getSubject);
    console.log("Student id from Subject: ", studentIdFromSubject);
    const res = await SubjectModel.findOneAndDelete({ _id: id }).session(
      session
    );

    const student = await StudentModel.findById(studentIdFromSubject).session(
      session
    );

    ///Check this-> first subject delete haoyar pore student check korche,Student Na pele Previous subject o delete hobe na
    if (!student) {
      throw new AppError(404, "Student not found");
    }

    const deleteStudentRes = await StudentModel.findOneAndDelete({
      _id: studentIdFromSubject,
    }).session(session);

    await session.commitTransaction();
    session.endSession();

    return res;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
const updateSubjectFromDB = async (
  id: string,
  subjectData: Partial<TSubject>
) => {
  const res = await SubjectModel.findOneAndUpdate(
    { _id: id },
    { $set: subjectData },
    {
      new: true,
      runValidators: true, //Model er role use korbe
    }
  );

  return res;
};

export const SubjectServices = {
  createSubjectIntoDB,
  getAllSubjectFromDB,
  getSingleSubjectFromDB,
  deleteSubjectFromDB,
  updateSubjectFromDB,
};
