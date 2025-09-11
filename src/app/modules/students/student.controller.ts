import { NextFunction, Request, RequestHandler, Response } from "express";
import { studentServices } from "./student.service";
import { studentValidationSchemaByZod } from "./student.validation";
import catchAsync from "../../utils/catchAsync";

const createStudent = catchAsync(async (req, res, next) => {
  const studentData = req.body;
  // console.log("Studentt Data: ", studentData);

  const zodParserData = studentValidationSchemaByZod.parse(studentData);

  const result = await studentServices.createStudentIntoDB(zodParserData);

  res.status(200).json({
    success: true,
    message: "Student Created Successfully",
    data: result,
  });
});

const getAllStudent = catchAsync(async (req, res) => {
  const result = await studentServices.getAllStudentFromDB();
  res.status(200).json({
    success: true,
    message: "Student Retrive Successfully",
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res) => {
  const { email } = req.params;
  const result = await studentServices.getSingleStudentFromDB(email);
  res.status(200).json({
    success: true,
    message: "Student Retrive Successfully",
    data: result,
  });
});
const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.params;
  const result = await studentServices.deleteStudentFromDB(email);
  res.status(200).json({
    success: true,
    message: "Student Deleted Successfully",
    data: result,
  });
});

const updateStudent = catchAsync(async (req, res) => {
  const { email } = req.params;
  const studentData = req.body;
  const result = await studentServices.updateStudentFromDB(email, studentData);
  res.status(200).json({
    success: true,
    message: "Student Updated Successfully",
    data: result,
  });
});

export const studentControllers = {
  createStudent,
  getAllStudent,
  getSingleStudent,
  deleteStudent,
  updateStudent,
};
