"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentModel = void 0;
const mongoose_1 = require("mongoose");
const studentSchema = new mongoose_1.Schema({
    id: {
        type: Number,
        required: [true, "Student ID is required"],
        unique: true,
    },
    name: { type: String, required: [true, "Student name is required"] },
    image: { type: String, required: [true, "Student image is required"] },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/.+@.+\..+/, "Please fill a valid email address"],
    },
    dob: { type: String, required: [true, "Date of birth is required"] },
    sex: {
        type: String,
        enum: {
            values: ["male", "female"],
            message: "Sex must be either 'male' or 'female'",
        },
        required: [true, "Sex is required"],
    },
    age: { type: Number, required: [true, "Age is required"] },
    bloodGroup: {
        type: String,
        enum: {
            values: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
            message: "Blood group must be a valid type",
        },
        required: [true, "Blood group is required"],
    },
    password: { type: String, required: [true, "Password is required"] },
    isDelete: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
}, {
    timestamps: true,
});
exports.StudentModel = (0, mongoose_1.model)("student", studentSchema);
