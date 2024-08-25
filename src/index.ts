import express, { Request, Response } from "express";
import connectDatabase from "./config/db";
import env from "./validations/env";

const app = express();

app.use(express.json());

const PORT = env.PORT || 3000;

connectDatabase();

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
