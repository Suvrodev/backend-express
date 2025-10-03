"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "User Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/.+@.+\..+/, "Please provide a valid email address"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 8 characters long"],
        select: false, // default query te password dibe na
    },
    role: {
        type: String,
        enum: ["user", "admin", "super-admin"],
        default: "user",
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
    strict: "throw",
});
//Query Middlware
userSchema.pre("find", function (next) {
    this.find({ isDeleted: false });
    next();
});
exports.UserModel = (0, mongoose_1.model)("user", userSchema);
