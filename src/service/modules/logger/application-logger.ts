import winston from "winston";
import { ILogger } from "./interfaces";
import { ApplicationLogger } from "./types";

export const applicationLogger: ApplicationLogger = {
  createLogger(context: any): ILogger {
    return winston.createLogger({
      level: context.env.development ? "debug" : "info",
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
          format: context.env.development
            ? winston.format.prettyPrint()
            : winston.format.json(),
          maxsize: 5242880, // 5MB
        }),
      ],
    });
  },
};
