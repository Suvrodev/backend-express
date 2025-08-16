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
// const express = require('express')
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 7000;
//For req.body - json
app.use(express_1.default.json());
const useRouter = express_1.default.Router();
app.use(useRouter);
useRouter.get("/urr", (req, res) => {
    console.log("Check Use-Router");
    res.json({
        message: "By use Router",
    });
});
app.get("/", (req, res) => {
    res.json({
        message: "Hum Hum",
    });
});
app.get("/ur", (req, res) => {
    res.json({
        message: "Hum Hum",
    });
});
app.post("/", (req, res) => {
    const data = req.body;
    console.log("Data:", data);
    res.json({
        message: "Successfully got data",
    });
});
app.get("/error", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send("Something");
    }
    catch (err) {
        next(err);
    }
}));
///Route Not Found
// app.all("*", async (req: Request, res: Response) => {
//   res.status(404).json({
//     success: false,
//     message: "Invalid Route",
//   });
// });
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});
///Global Error Handler
app.use((error, req, res, next) => {
    console.log("In Global Error: ", error);
    res.status(400).json({
        success: false,
        message: "Something went wrong",
    });
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
exports.default = app;
