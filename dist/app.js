"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require('express')
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
//For req.body - json
app.use(express_1.default.json());
const port = 7000;
app.get("/", (req, res) => {
    res.send("Hello Back end by Nodemon");
});
app.post("/", (req, res) => {
    const data = req.body;
    console.log("Data:", data);
    res.json({
        message: "Successfully got data",
    });
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
exports.default = app;
