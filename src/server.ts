import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

async function main() {
  try {
    // const PORT = Number(process.env.PORT) || 7000;
    // const DB_URL = process.env.DATABASE_URL as string;

    await mongoose.connect(config.database_url as string);

    app.listen(config.port, () => {
      console.log(`Back end is listening on port ${config.database_url}`);
    });
  } catch (error) {
    console.log("Error in server: ", error);
  }
}
main();
