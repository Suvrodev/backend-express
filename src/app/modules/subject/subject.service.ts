import { TSubject } from "./subject.interface";
import { SubjectModel } from "./subject.model";

const createSubjectIntoDB = async (student: TSubject) => {
  const res = await SubjectModel.create(student);
  return res;
};

const getAllSubjectFromDB = async () => {
  const res = await SubjectModel.find().populate("studentId");
  return res;
};

const getSingleSubjectFromDB = async (id: string) => {
  const res = await SubjectModel.findOne({ _id: id }).populate("studentId");
  return res;
};

const deleteSubjectFromDB = async (id: string) => {
  const res = await SubjectModel.findOneAndDelete({ _id: id });

  return res;
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
