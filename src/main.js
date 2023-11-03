import { web } from "./app/web.js";
import { logger } from "./app/logging.js";

web.listen(8080, "127.0.0.1", () => {
  logger.info("App start");
});
