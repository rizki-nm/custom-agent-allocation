import { web } from "./application/web.js";
import { logger } from "./application/logging.js";

web.listen(3000, () => {
    console.info("App start")
    logger.info("App start");
});
