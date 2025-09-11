"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubjectControllers = void 0;
const subject_validation_1 = require("./subject.validation");
const subject_service_1 = require("./subject.service");
const createSubject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const subjectBody = req.body;
    // console.log("Studentt Data: ", studentData);
    const zodParserData = subject_validation_1.subjectValidationSchemaByZod.parse(subjectBody);
    try {
        const result = yield subject_service_1.SubjectServices.createSubjectIntoDB(zodParserData);
        res.status(200).json({
            success: true,
            message: "Subject Created Successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error,
        });
    }
});
const getAllSubject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield subject_service_1.SubjectServices.getAllSubjectFromDB();
        res.status(200).json({
            success: true,
            message: "Subject Retrive Successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error,
        });
    }
});
const getSingleSubject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield subject_service_1.SubjectServices.getSingleSubjectFromDB(id);
        res.status(200).json({
            success: true,
            message: "Subject Retrive Successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error,
        });
    }
});
const deleteSubject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield subject_service_1.SubjectServices.deleteSubjectFromDB(id);
        res.status(200).json({
            success: true,
            message: "Subject Deleted Successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error,
        });
    }
});
const updateSubject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const subjectData = req.body;
        const result = yield subject_service_1.SubjectServices.updateSubjectFromDB(id, subjectData);
        res.status(200).json({
            success: true,
            message: "Subject Updated Successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error,
        });
    }
});
exports.SubjectControllers = {
    createSubject,
    getAllSubject,
    getSingleSubject,
    deleteSubject,
    updateSubject,
};
