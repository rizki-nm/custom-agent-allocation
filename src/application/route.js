import express from "express";
import webhookController from "../webhooks/controller.js";
import syncAgent from "../middlewares/syncAgent.js";

const router = new express.Router();
router.post('/api/v1/webhooks/allocation', syncAgent, webhookController.assign);
router.post('/api/v1/webhooks/mark-as-resolved', syncAgent, webhookController.resolve);
router.get('/healthcheck', (req, res) => {
    res.status(200).json({ message: 'ok' });
});

export default router;