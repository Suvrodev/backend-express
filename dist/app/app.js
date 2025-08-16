"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require('express')
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 7000;
app.get("/", (req, res) => {
    res.send("Hello Back end");
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
exports.default = app;
