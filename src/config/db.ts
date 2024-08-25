import mongoose, { Connection } from "mongoose";
import env from "../validations/env";

async function connectDatabase() {
  const connection = await mongoose
    .connect(env.DB_LOCAL as string)
    .then(() => console.log("DATABASE CONNECTED"))
    .catch((error: any) => {
      console.error("MongoDB connection error:", error.message);
      process.exit(1);
    });
}

export default connectDatabase;
