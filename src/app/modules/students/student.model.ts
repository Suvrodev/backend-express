import { model, Schema } from "mongoose";
import { MStudentModel, TStudent } from "./students.interface";
import bcrypt from "bcrypt";
import config from "../../config";
import AppError from "../../Errors/AppError";
import status from "http-status";
const studentSchema = new Schema<TStudent, MStudentModel>(
  {
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
  },
  {
    timestamps: true,
    strict: "throw",
  }
);

/**
 * Middleware start
 */

//Document Middlware

studentSchema.pre("save", async function (next) {
  //Hashing password and save into db
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  // console.log(this, "Pre hook: We will save data");
  next();
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
studentSchema.statics.isStudentExists = async function (email: string) {
  const existingStudent = await StudentModel.findOne({ email });
  return existingStudent;
};

export const StudentModel = model<TStudent, MStudentModel>(
  "student",
  studentSchema
);

/**
 *  Save- Remove ->Document middlware ->current document e point kore
 *  find- Query Middleware ->  Current Query k
 *   aggregate ->Aggregation Middleware -> Current pipeline k point kore
 */
