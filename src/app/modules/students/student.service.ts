import { StudentModel } from "./student.model";
import { TStudent } from "./students.interface";

const createStudentIntoDB = async (student: TStudent) => {
  const res = await StudentModel.create(student);
  return res;
};

export const studentServices = {
  createStudentIntoDB,
};
