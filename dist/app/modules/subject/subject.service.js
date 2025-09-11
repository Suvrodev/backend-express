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
exports.SubjectServices = void 0;
const subject_model_1 = require("./subject.model");
const createSubjectIntoDB = (student) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield subject_model_1.SubjectModel.create(student);
    return res;
});
const getAllSubjectFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield subject_model_1.SubjectModel.find().populate("studentId");
    return res;
});
const getSingleSubjectFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield subject_model_1.SubjectModel.findOne({ _id: id }).populate("studentId");
    return res;
});
const deleteSubjectFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield subject_model_1.SubjectModel.findOneAndDelete({ _id: id });
    return res;
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
