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
exports.SubjectControllers = void 0;
const subject_service_1 = require("./subject.service");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const createSubject = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const subjectBody = req.body;
    const result = yield subject_service_1.SubjectServices.createSubjectIntoDB(subjectBody);
    res.status(200).json({
        success: true,
        message: "Subject Created Successfully",
        data: result,
    });
}));
const getAllSubject = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield subject_service_1.SubjectServices.getAllSubjectFromDB();
    res.status(200).json({
        success: true,
        message: "Subject Retrive Successfully",
        data: result,
    });
}));
const getSingleSubject = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield subject_service_1.SubjectServices.getSingleSubjectFromDB(id);
    res.status(200).json({
        success: true,
        message: "Subject Retrive Successfully",
        data: result,
    });
}));
const deleteSubject = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield subject_service_1.SubjectServices.deleteSubjectFromDB(id);
    res.status(200).json({
        success: true,
        message: "Subject Deleted Successfully",
        data: result,
    });
}));
const updateSubject = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const subjectData = req.body;
    const result = yield subject_service_1.SubjectServices.updateSubjectFromDB(id, subjectData);
    res.status(200).json({
        success: true,
        message: "Subject Updated Successfully",
        data: result,
    });
}));
exports.SubjectControllers = {
    createSubject,
    getAllSubject,
    getSingleSubject,
    deleteSubject,
    updateSubject,
};
