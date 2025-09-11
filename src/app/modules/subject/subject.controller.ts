import { NextFunction, Request, RequestHandler, Response } from "express";
import { SubjectServices } from "./subject.service";
import catchAsync from "../../utils/catchAsync";

const createSubject = catchAsync(async (req, res, next) => {
  const subjectBody = req.body;

  const result = await SubjectServices.createSubjectIntoDB(subjectBody);

  res.status(200).json({
    success: true,
    message: "Subject Created Successfully",
    data: result,
  });
});

const getAllSubject: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await SubjectServices.getAllSubjectFromDB();
  res.status(200).json({
    success: true,
    message: "Subject Retrive Successfully",
    data: result,
  });
});
const getSingleSubject = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await SubjectServices.getSingleSubjectFromDB(id);
  res.status(200).json({
    success: true,
    message: "Subject Retrive Successfully",
    data: result,
  });
});
const deleteSubject: RequestHandler = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await SubjectServices.deleteSubjectFromDB(id);
  res.status(200).json({
    success: true,
    message: "Subject Deleted Successfully",
    data: result,
  });
});

const updateSubject: RequestHandler = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const subjectData = req.body;
  const result = await SubjectServices.updateSubjectFromDB(id, subjectData);
  res.status(200).json({
    success: true,
    message: "Subject Updated Successfully",
    data: result,
  });
});

export const SubjectControllers = {
  createSubject,
  getAllSubject,
  getSingleSubject,
  deleteSubject,
  updateSubject,
};
