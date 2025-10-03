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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentControllers = void 0;
const student_service_1 = require("./student.service");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const createStudent = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log("header user ", (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.email);
    const studentData = req.body;
    // console.log("Studentt Data: ", studentData);
    // const zodParserData = studentValidationSchemaByZod.parse(studentData);
    // const result = await studentServices.createStudentIntoDB(zodParserData);
    const result = yield student_service_1.studentServices.createStudentIntoDB(studentData);
    res.status(200).json({
        success: true,
        message: "Student Created Successfully",
        data: result,
    });
}));
const getAllStudent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log("req te user check: ", (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.email);
    console.log("Check cookies:", req === null || req === void 0 ? void 0 : req.cookies);
    const result = yield student_service_1.studentServices.getAllStudentFromDB();
    res.status(200).json({
        success: true,
        message: "Student Retrive Successfully",
        data: result,
    });
}));
const getSingleStudent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    const result = yield student_service_1.studentServices.getSingleStudentFromDB(email);
    res.status(200).json({
        success: true,
        message: "Student Retrive Successfully",
        data: result,
    });
}));
const deleteStudent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    const result = yield student_service_1.studentServices.deleteStudentFromDB(email);
    res.status(200).json({
        success: true,
        message: "Student Deleted Successfully",
        data: result,
    });
}));
const updateStudent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    const studentData = req.body;
    const result = yield student_service_1.studentServices.updateStudentFromDB(email, studentData);
    res.status(200).json({
        success: true,
        message: "Student Updated Successfully",
        data: result,
    });
}));
exports.studentControllers = {
    createStudent,
    getAllStudent,
    getSingleStudent,
    deleteStudent,
    updateStudent,
};
