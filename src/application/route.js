import express from "express";
import webhookController from "../webhooks/controller.js";
import syncAgent from "../middlewares/syncAgent.js";

const router = new express.Router();
router.post('/api/v1/webhooks/caa', syncAgent, webhookController.assign);
router.post('/api/v1/webhooks/resolve', syncAgent, webhookController.resolve);

export default router;