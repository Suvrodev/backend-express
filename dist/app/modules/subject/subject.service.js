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
exports.SubjectServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const student_model_1 = require("../students/student.model");
const subject_model_1 = require("./subject.model");
const AppError_1 = __importDefault(require("../../Errors/AppError"));
const createSubjectIntoDB = (student) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield subject_model_1.SubjectModel.create(student);
    return res;
});
const getAllSubjectFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    // throw new AppError(404, "Not FOund");
    const res = yield subject_model_1.SubjectModel.find().populate("studentId");
    return res;
});
const getSingleSubjectFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield subject_model_1.SubjectModel.findOne({ _id: id }).populate("studentId");
    return res;
});
const deleteSubjectFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const getSubject = yield subject_model_1.SubjectModel.findById(id).session(session);
        if (!getSubject) {
            throw new AppError_1.default(404, "Subject Not Found");
        }
        const studentIdFromSubject = getSubject === null || getSubject === void 0 ? void 0 : getSubject.studentId;
        console.log("Get Subject before delete: ", getSubject);
        console.log("Student id from Subject: ", studentIdFromSubject);
        const res = yield subject_model_1.SubjectModel.findOneAndDelete({ _id: id }).session(session);
        const student = yield student_model_1.StudentModel.findById(studentIdFromSubject).session(session);
        ///Check this-> first subject delete haoyar pore student check korche,Student Na pele Previous subject o delete hobe na
        if (!student) {
            throw new AppError_1.default(404, "Student not found");
        }
        const deleteStudentRes = yield student_model_1.StudentModel.findOneAndDelete({
            _id: studentIdFromSubject,
        }).session(session);
        yield session.commitTransaction();
        session.endSession();
        return res;
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
const updateSubjectFromDB = (id, subjectData) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield subject_model_1.SubjectModel.findOneAndUpdate({ _id: id }, { $set: subjectData }, {
        new: true,
        runValidators: true, //Model er role use korbe
    });
    return res;
});
exports.SubjectServices = {
    createSubjectIntoDB,
    getAllSubjectFromDB,
    getSingleSubjectFromDB,
    deleteSubjectFromDB,
    updateSubjectFromDB,
};
