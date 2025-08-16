// const express = require('express')
import express, { NextFunction, Request, Response } from "express";
const app = express();

const port = 7000;

//For req.body - json
app.use(express.json());

const useRouter = express.Router();
app.use(useRouter);
useRouter.get("/urr", (req: Request, res: Response) => {
  console.log("Check Use-Router");
  res.json({
    message: "By use Router",
  });
});

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Hum Hum",
  });
});
app.get("/ur", (req: Request, res: Response) => {
  res.json({
    message: "Hum Hum",
  });
});
app.post("/", (req: Request, res: Response) => {
  const data = req.body;

  console.log("Data:", data);
  res.json({
    message: "Successfully got data",
  });
});

app.get("/error", async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send("Something");
  } catch (err) {
    next(err);
  }
});

///Route Not Found
// app.all("*", async (req: Request, res: Response) => {
//   res.status(404).json({
//     success: false,
//     message: "Invalid Route",
//   });
// });

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

///Global Error Handler
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log("In Global Error: ", error);
  res.status(400).json({
    success: false,
    message: "Something went wrong",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default app;
