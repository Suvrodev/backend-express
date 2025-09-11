"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubjectModel = void 0;
const mongoose_1 = require("mongoose");
const subjectSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Subject Name is required"],
        unique: true,
    },
    language: { type: String, required: [true, "Language is required"] },
    studentId: { type: String, required: [true, "Student id is required"] },
}, {
    timestamps: true,
    strict: "throw",
});
exports.SubjectModel = (0, mongoose_1.model)("subject", subjectSchema);
