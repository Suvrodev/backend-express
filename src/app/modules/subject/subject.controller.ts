import { NextFunction, Request, Response } from "express";
import { SubjectServices } from "./subject.service";
import { subjectValidationSchema } from "./subject.validation";

const createSubject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const subjectBody = req.body;
  // console.log("Studentt Data: ", studentData);

  //   const zodParserData = subjectValidationSchema.parse(subjectBody);

  try {
    const result = await SubjectServices.createSubjectIntoDB(subjectBody);

    res.status(200).json({
      success: true,
      message: "Subject Created Successfully",
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

const getAllSubject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await SubjectServices.getAllSubjectFromDB();
    res.status(200).json({
      success: true,
      message: "Subject Retrive Successfully",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};
const getSingleSubject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await SubjectServices.getSingleSubjectFromDB(id);
    res.status(200).json({
      success: true,
      message: "Subject Retrive Successfully",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};
const deleteSubject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await SubjectServices.deleteSubjectFromDB(id);
    res.status(200).json({
      success: true,
      message: "Subject Deleted Successfully",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

const updateSubject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
    next(error);
  }
};

export const SubjectControllers = {
  createSubject,
  getAllSubject,
  getSingleSubject,
  deleteSubject,
  updateSubject,
};
