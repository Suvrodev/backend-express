// const express = require('express')
import express, { Request, Response } from "express";
const app = express();

//For req.body - json
app.use(express.json());
const port = 7000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Back end by Nodemon");
});
app.post("/", (req: Request, res: Response) => {
  const data = req.body;

  console.log("Data:", data);
  res.json({
    message: "Successfully got data",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default app;
