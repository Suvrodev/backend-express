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
exports.studentControllers = void 0;
const student_service_1 = require("./student.service");
const createStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const studentData = req.body;
    console.log("Studentt Data: ", studentData);
    try {
        const result = yield student_service_1.studentServices.createStudentIntoDB(studentData);
        res.status(200).json({
            success: true,
            message: "Student Created Successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Something is went wrong",
            error: error,
        });
    }
});
const getAllStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield student_service_1.studentServices.getAllStudentFromDB();
        res.status(200).json({
            success: true,
            message: "Student Retrive Successfully",
            data: result,
        });
    }
    catch (error) {
        console.log("Error in create Student: ", error);
    }
});
const getSingleStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.params;
        const result = yield student_service_1.studentServices.getSingleStudentFromDB(email);
        res.status(200).json({
            success: true,
            message: "Student Retrive Successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Something is went wrong",
            error: error,
        });
    }
});
const deleteStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.params;
        const result = yield student_service_1.studentServices.deleteStudentFromDB(email);
        res.status(200).json({
            success: true,
            message: "Student Deleted Successfully",
            data: result,
        });
    }
    catch (error) {
        console.log("Error in create Student: ", error);
    }
});
const updateStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.params;
        const studentData = req.body;
        const result = yield student_service_1.studentServices.updateStudentFromDB(email, studentData);
        res.status(200).json({
            success: true,
            message: "Student Updated Successfully",
            data: result,
        });
    }
    catch (error) {
        console.log("Error in create Student: ", error);
    }
});
exports.studentControllers = {
    createStudent,
    getAllStudent,
    getSingleStudent,
    deleteStudent,
    updateStudent,
};
