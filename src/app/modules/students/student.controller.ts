import { Request, Response } from "express";
import { studentServices } from "./student.service";

const createStudent = async (req: Request, res: Response) => {
  const studentData = req.body;
  console.log("Studentt Data: ", studentData);

  try {
    const result = await studentServices.createStudentIntoDB(studentData);
    res.status(200).json({
      success: true,
      message: "Student Created Successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something is went wrong",
      error: error,
    });
  }
};

const getAllStudent = async (req: Request, res: Response) => {
  try {
    const result = await studentServices.getAllStudentFromDB();
    res.status(200).json({
      success: true,
      message: "Student Retrive Successfully",
      data: result,
    });
  } catch (error) {
    console.log("Error in create Student: ", error);
  }
};
const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const result = await studentServices.getSingleStudentFromDB(email);
    res.status(200).json({
      success: true,
      message: "Student Retrive Successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something is went wrong",
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
  } catch (error) {
    console.log("Error in create Student: ", error);
  }
};

const updateStudent = async (req: Request, res: Response) => {
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
  } catch (error) {
    console.log("Error in create Student: ", error);
  }
};

export const studentControllers = {
  createStudent,
  getAllStudent,
  getSingleStudent,
  deleteStudent,
  updateStudent,
};
