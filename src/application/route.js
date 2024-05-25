import express from "express";
import webhookController from "../webhooks/controller.js";

const router = new express.Router();
router.post('/api/v1/webhooks/caa', webhookController.assign);
router.post('/api/v1/webhooks/resolve', webhookController.resolve);

export default router;