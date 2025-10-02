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
exports.StudentModel = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const studentSchema = new mongoose_1.Schema({
    id: {
        type: Number,
        required: [true, "Student ID is required"],
        unique: true,
    },
    name: { type: String },
    taka: { type: Number, required: [true, "Taka is required"] },
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
    password: {
        type: String,
        required: [true, "Password is required"],
        select: false,
    },
    isDelete: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
}, {
    timestamps: true,
    strict: "throw",
});
/**
 * Middleware start
 */
//Document Middlware
studentSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        //Hashing password and save into db
        const user = this;
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bcrypt_salt_rounds));
        // console.log(this, "Pre hook: We will save data");
        next();
    });
});
// studentSchema.pre("save", async function (next) {
//   const user = this as TStudent;
//   const email = user.email;
//   const existingStudent = await StudentModel.findOne({ email: user.email });
//   if (existingStudent) {
//     return next(
//       new AppError(
//         status.BAD_REQUEST,
//         "Student with this email already exists (check from middleware)"
//       )
//     );
//   }
//   next();
// });
studentSchema.post("save", function (doc, next) {
    // console.log("Post Hook: We saved Our Data");
    doc.password = "";
    next();
});
//Query Middlware
studentSchema.pre("find", function (next) {
    this.find({ isDelete: false });
    next();
});
/**
 * Middleware end
 */
//Creating an custom instance method
// studentSchema.methods.isUserExists = async function (email: string) {
//   const existingStudent = await StudentModel.findOne({ email });
//   return existingStudent;
// };
//Creating static
studentSchema.statics.isStudentExists = function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingStudent = yield exports.StudentModel.findOne({ email });
        return existingStudent;
    });
};
exports.StudentModel = (0, mongoose_1.model)("student", studentSchema);
/**
 *  Save- Remove ->Document middlware ->current document e point kore
 *  find- Query Middleware ->  Current Query k
 *   aggregate ->Aggregation Middleware -> Current pipeline k point kore
 */
