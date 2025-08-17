import { StudentModel } from "./student.model";
import { TStudent } from "./students.interface";

const createStudentIntoDB = async (student: TStudent) => {
  const res = await StudentModel.create(student);
  return res;
};

const getAllStudentFromDB = async () => {
  const res = await StudentModel.find();
  return res;
};

const getSingleStudentFromDB = async (email: string) => {
  const res = await StudentModel.findOne({ email: email });
  return res;
};

const deleteStudentFromDB = async (email: string) => {
  const res = await StudentModel.deleteOne({ email: email });
  return res;
};
const updateStudentFromDB = async (
  email: string,
  studentData: Partial<TStudent>
) => {
  const res = await StudentModel.findOneAndUpdate(
    { email: email },
    { $set: studentData },
    {
      new: true,
      runValidators: true,
    }
  );

  return res;
};

export const studentServices = {
  createStudentIntoDB,
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentFromDB,
};
