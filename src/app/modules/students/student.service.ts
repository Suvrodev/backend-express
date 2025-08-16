import { StudentModel } from "./student.model";
import { TStudent } from "./students.interface";

const createStudentIntoDB = async (student: TStudent) => {
  const res = await StudentModel.create(student);
  return res;
};

const getAllStudentFromDB = async () => {
  console.log("__________________________________");
  const res = await StudentModel.find();
  return res;
};

const getSingleStudentFromDB = async (email: string) => {
  console.log("================");
  console.log("Come Email: ", email);
  const res = await StudentModel.findOne({ email: email });
  return res;
};

export const studentServices = {
  createStudentIntoDB,
  getAllStudentFromDB,
  getSingleStudentFromDB,
};
