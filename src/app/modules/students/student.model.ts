import { model, Schema } from "mongoose";
import { MStudentModel, TStudent } from "./students.interface";
import bcrypt from "bcrypt";
import config from "../../config";
const studentSchema = new Schema<TStudent, MStudentModel>(
  {
    id: {
      type: Number,
      required: [true, "Student ID is required"],
      unique: true,
    },
    name: { type: String, required: [true, "Student name is required"] },
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
    password: { type: String, required: [true, "Password is required"] },
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

studentSchema.pre("save", async function (next) {
  //Hashing password and save into db
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  console.log(this, "Pre hook: We will save data");
  next();
});

studentSchema.post("save", function () {
  console.log("Post Hook: We saved Our Data");
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
