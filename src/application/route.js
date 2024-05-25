import express from "express";
import webhookController from "../webhooks/controller.js";

const router = new express.Router();
router.post('/webhooks/caa', webhookController.assign);
router.post('/webhooks/resolve', webhookController.resolve);

export default router;