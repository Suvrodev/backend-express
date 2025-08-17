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
exports.studentServices = void 0;
const student_model_1 = require("./student.model");
const createStudentIntoDB = (student) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield student_model_1.StudentModel.create(student);
    return res;
});
const getAllStudentFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield student_model_1.StudentModel.find();
    return res;
});
const getSingleStudentFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield student_model_1.StudentModel.findOne({ email: email });
    return res;
});
const deleteStudentFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield student_model_1.StudentModel.deleteOne({ email: email });
    return res;
});
const updateStudentFromDB = (email, studentData) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield student_model_1.StudentModel.findOneAndUpdate({ email: email }, { $set: studentData }, {
        new: true,
        runValidators: true,
    });
    return res;
});
exports.studentServices = {
    createStudentIntoDB,
    getAllStudentFromDB,
    getSingleStudentFromDB,
    deleteStudentFromDB,
    updateStudentFromDB,
};
