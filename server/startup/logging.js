import winston from "winston";
import logger from "../helpers/logger.js";

export default function () {
  logger.exceptions.handle(
    new winston.transports.File({ filename: "errors.log" })
  );
  if (process.env.NODE_ENV === "production") return;

  logger.add(
    new winston.transports.Console({
      level: "info",
      format: winston.format.combine(
        winston.format.colorize({ colors: "all" }),
        winston.format.simple()
      ),
    })
  );

  logger.exceptions.handle(new winston.transports.Console());
}
