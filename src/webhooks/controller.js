import { logger } from "../application/logging.js";
import service from "./service.js";

const assign = async (req, res) => {
    const { room_id } = req.body;

    try {
        const assign = await service.assignService(room_id);

        if (assign) {
            logger.info({ room_id, assign });
            res.status(200).json({ message: 'Agent assigned successfully' });
        } else {
            logger.info({ room_id, 'in_queue': true });
            res.status(200).json({ message: 'Customer is in queue' });
        }
    } catch (error) {
        logger.error(`Failed to assign agent: ${error}`);
        res.status(500).json({ error: 'Failed to assign agent' });
    }
}

const resolve = async (req, res) => {
    const { room_id } = req.body.service;

    try {
        const { nextCustName, nextRoomId, agentName } = await service.resolveService(room_id);
        logger.info({ 'customerName': nextCustName, 'room_id': nextRoomId, agentName, 'antri': false });
    } catch (error) {
        logger.info("Tidak ada antrian");
    }
}


export default {
    assign,
    resolve
}