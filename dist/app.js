"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require('express')
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./app/config"));
const student_route_1 = require("./app/modules/students/student.route");
const app = (0, express_1.default)();
//Perser For req.body - json
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//application route
app.use("/api/student", student_route_1.studentRoutes);
app.get("/", (req, res) => {
    res.json({
        message: `This back end is Listening is on port ${config_1.default.port}`,
    });
});
exports.default = app;
