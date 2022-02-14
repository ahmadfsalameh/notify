import mongoose from "mongoose";
import logger from "../helpers/logger.js";

export default function () {
  const dBConnection = process.env.database;
  mongoose
    .connect(dBConnection)
    .then(() => logger.info("Connected to mongodb"));
}
