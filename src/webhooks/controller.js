import { logger } from "../application/logging.js";
import service from "./service.js";

const assign = async (req, res) => {
    const { email, name, room_id } = req.body;

    const agentName = await service.assignService(email, name, room_id);

    if (agentName) {
        logger.info({ 'customerName': name, room_id, agentName });
    } else if (agentName === false) {
        logger.error("ayo agents cepat :D");
    } else {
        logger.info({ 'customerName': name, room_id, 'antri': true });
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