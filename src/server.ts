import { Server } from "http";
import app from "./app";

const port = 7000;

let server: Server;

async function bootStrap() {
  server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

bootStrap();
