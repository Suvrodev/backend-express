import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";
import { Server } from "http";
import seedSuperAdmin from "./app/utils/super-admin/create-super-admin";

let server: Server;

async function main() {
  try {
    // const PORT = Number(process.env.PORT) || 7000;
    // const DB_URL = process.env.DATABASE_URL as string;

    await mongoose.connect(config.database_url as string);

    //For super Admin
    await seedSuperAdmin();

    server = app.listen(config.port, () => {
      // console.log(`Back end is listening on port ${config.database_url}`);
      console.log(
        "\x1b[34m%s\x1b[0m",
        `🔵 Back end is listening on port ${config.database_url}`
      );
    });
  } catch (error) {
    console.log("Error in server: ", error);
  }
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
