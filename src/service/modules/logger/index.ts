import winston from "winston";
import { ILogger } from "./interfaces";
import { env } from "../../../config/environment";

const getWinstonLogger = (): ILogger => {
  return winston.createLogger({
    level: env.development ? "debug" : "info",
    format: winston.format.combine(
      winston.format.splat(),
      winston.format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" })
    ),
    transports: [
      new winston.transports.Console({
        stderrLevels: ["error"],
        format: winston.format.prettyPrint(),
      }),
      new winston.transports.File({
        filename: "server.log",
        format: env.development
          ? winston.format.prettyPrint()
          : winston.format.json(),
        maxsize: 5242880, // 5MB
      }),
    ],
  });
};

const logger = getWinstonLogger();

export default logger;
