// const express = require('express')
import express, { Request, Response } from "express";
const app = express();
const port = 7000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Back end by Nodemon");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default app;
