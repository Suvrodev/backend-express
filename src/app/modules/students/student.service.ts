import { StudentModel } from "./student.model";
import { TStudent } from "./students.interface";

const createStudentIntoDB = async (student: TStudent) => {
  // const res = await StudentModel.create(student);
  const studentObj = new StudentModel(student);
  if (await studentObj.isUserExists(student.email)) {
    throw new Error("User Already Exists");
  }
  const res = await studentObj.save();
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
      runValidators: true, //Model er role use korbe
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
