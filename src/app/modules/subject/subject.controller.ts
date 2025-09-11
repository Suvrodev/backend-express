import { Request, Response } from "express";
import { subjectValidationSchemaByZod } from "./subject.validation";
import { SubjectServices } from "./subject.service";

const createSubject = async (req: Request, res: Response) => {
  const subjectBody = req.body;
  // console.log("Studentt Data: ", studentData);

  const zodParserData = subjectValidationSchemaByZod.parse(subjectBody);

  try {
    const result = await SubjectServices.createSubjectIntoDB(zodParserData);

    res.status(200).json({
      success: true,
      message: "Subject Created Successfully",
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

const getAllSubject = async (req: Request, res: Response) => {
  try {
    const result = await SubjectServices.getAllSubjectFromDB();
    res.status(200).json({
      success: true,
      message: "Subject Retrive Successfully",
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
const getSingleSubject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await SubjectServices.getSingleSubjectFromDB(id);
    res.status(200).json({
      success: true,
      message: "Subject Retrive Successfully",
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
const deleteSubject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await SubjectServices.deleteSubjectFromDB(id);
    res.status(200).json({
      success: true,
      message: "Subject Deleted Successfully",
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

const updateSubject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const subjectData = req.body;
    const result = await SubjectServices.updateSubjectFromDB(id, subjectData);
    res.status(200).json({
      success: true,
      message: "Subject Updated Successfully",
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

export const SubjectControllers = {
  createSubject,
  getAllSubject,
  getSingleSubject,
  deleteSubject,
  updateSubject,
};
