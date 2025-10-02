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
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./app/config"));
let server;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // const PORT = Number(process.env.PORT) || 7000;
            // const DB_URL = process.env.DATABASE_URL as string;
            yield mongoose_1.default.connect(config_1.default.database_url);
            server = app_1.default.listen(config_1.default.port, () => {
                console.log(`Back end is listening on port ${config_1.default.database_url}`);
            });
        }
        catch (error) {
            console.log("Error in server: ", error);
        }
    });
}
main();
///Unhandle Rejection
process.on("unhandledRejection", (reason, promise) => {
    console.error("🚨 Unhandled Rejection detected:", reason);
    console.error("Promise was:", promise);
    console.log("😡😡 Unhandle rejection is detected, shutting down...");
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
//uncought exception
process.on("uncaughtException", (err) => {
    console.error("💥 Uncaught Exception detected:", err);
    process.exit(1);
});
