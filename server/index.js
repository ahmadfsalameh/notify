import express from "express";
import dotenv from "dotenv";
import logger from "./helpers/logger.js";
import logging from "./startup/logging.js";
import routes from "./startup/routes.js";
import db from "./startup/db.js";

const app = express();
dotenv.config();

logging();
routes(app);
db();

const port = process.env.PORT || 3001;
app.listen(port, () => logger.info(`Server connected on port: ${port}`));
