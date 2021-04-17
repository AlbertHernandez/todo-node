import { loggerFactory } from "../../server/modules/logger/logger-factory";

const logger = loggerFactory.get({
  prettify: true,
  utcTimestamp: true,
});

const index = async () => {
  logger.info("Starting to feed the database");

  logger.info("Finalize to feed the database");
};

index();
