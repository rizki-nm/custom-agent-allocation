import repository from "./repository.js";
import dotenv from "dotenv";
import {logger} from "../application/logging.js";
import qiscusClient from "../lib/http_client/qiscus/multichannel/qiscusClient.js";

dotenv.config();

const assignService = async (roomId) => {
    try {
        await repository.insertQueue(roomId);
    } catch (error) {
        logger.error(`Failed to insert queue: ${error}`);
        return false;
    }

    const agentData = await repository.findAvailableAgent();

    if (agentData.length > 0) {
        const assignedAgent = agentData[0];

        try {
            await qiscusClient.assignAgent(roomId, assignedAgent.agent_id);
            await repository.updateQueueWithAgent(roomId, assignedAgent.agent_id);
            return true;
        } catch (error) {
            return false;
        }
    } else {
        return false;
    }
};

const resolveService = async (roomId) => {
    repository.updateQueueResolvedStatus(roomId)

    // Ambil queue sesuai antrian
    const nextCustResult = await repository.getNextCust();

    if (nextCustResult.rows.length > 0) {
        const nextRoomId = nextCustResult.rows[0].room_id;

        const agentData = await repository.findAvailableAgent();

        // Simpan informasi tentang agent yang menangani customer
        await repository.updateQueueWithAgent(nextRoomId, agentData[0].agent_id);

        try {
            await qiscusClient.assignAgent(roomId, assignedAgent.agent_id);
            await repository.updateQueueWithAgent(roomId, assignedAgent.agent_id);
            return true;
        } catch (error) {
            return false;
        }
    }
}

export default {
    assignService,
    resolveService,
}