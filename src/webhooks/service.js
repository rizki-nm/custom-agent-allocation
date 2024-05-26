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

    return await assignAgentToOC(roomId);
};

const resolveService = async (roomId) => {
    try {
        await repository.updateQueueResolvedStatus(roomId);

        const nextQueue = await repository.getNextQueue();

        if (nextQueue) {
            const nextRoomId = nextQueue.room_id;

            return await assignAgentToOC(nextRoomId);
        } else {
            return false;
        }
    } catch (error) {
        logger.error(`Failed to resolve queue: ${error}`);
        throw error;
    }
}

const assignAgentToOC = async (room_id) => {
    const agentData = await repository.findAvailableAgent();

    if (agentData.length > 0) {
        const assignedAgent = selectAgent(agentData);

        try {
            await repository.updateQueueWithAgent(room_id, assignedAgent.agent_id);
            await qiscusClient.assignAgent(room_id, assignedAgent.agent_id);
            return true;
        } catch (error) {
            logger.error(`Failed to assign agent: ${error}`);

            return false;
        }
    } else {
        return false;
    }
}

// Selects the agent with the least number of unresolved queues
const selectAgent = (agents) => {
    return agents.reduce((currentAgent, nextAgent) => {
        return (currentAgent.queues.length <= nextAgent.queues.length) ? currentAgent : nextAgent;
    });
};

export default {
    assignService,
    resolveService,
}