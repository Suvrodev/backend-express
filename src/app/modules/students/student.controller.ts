import { NextFunction, Request, RequestHandler, Response } from "express";
import { studentServices } from "./student.service";
import { studentValidationSchemaByZod } from "./student.validation";

const createStudent: RequestHandler = async (req, res, next) => {
  const studentData = req.body;
  // console.log("Studentt Data: ", studentData);

  const zodParserData = studentValidationSchemaByZod.parse(studentData);

  try {
    const result = await studentServices.createStudentIntoDB(zodParserData);

    res.status(200).json({
      success: true,
      message: "Student Created Successfully",
      data: result,
    });
  } catch (error: any) {
    // res.status(500).json({
    //   success: false,
    //   message: error.message,
    //   error: error,
    // });

    next(error);
  }
};

const getAllStudent: RequestHandler = async (req, res) => {
  try {
    const result = await studentServices.getAllStudentFromDB();
    res.status(200).json({
      success: true,
      message: "Student Retrive Successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};
const getSingleStudent: RequestHandler = async (req, res) => {
  try {
    const { email } = req.params;
    const result = await studentServices.getSingleStudentFromDB(email);
    res.status(200).json({
      success: true,
      message: "Student Retrive Successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};
const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const result = await studentServices.deleteStudentFromDB(email);
    res.status(200).json({
      success: true,
      message: "Student Deleted Successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const updateStudent: RequestHandler = async (req, res) => {
  try {
    const { email } = req.params;
    const studentData = req.body;
    const result = await studentServices.updateStudentFromDB(
      email,
      studentData
    );
    res.status(200).json({
      success: true,
      message: "Student Updated Successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const studentControllers = {
  createStudent,
  getAllStudent,
  getSingleStudent,
  deleteStudent,
  updateStudent,
};
