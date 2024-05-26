import { logger } from "../application/logging.js";
import qiscusClient from "../lib/http_client/qiscus/multichannel/qiscusClient.js";
import repository from "../webhooks/repository.js";

export default async (req, res, next) => {
    try {
        const agents = await qiscusClient.syncAgents();

        for (const agentData of agents.data.agents) {
            const agentIdStr = agentData.id.toString();
            const limitInt = parseInt(process.env.MAX_AGENT_HANDLE, 10);

            const existingAgent = await repository.findAgentById(agentIdStr)

            if (existingAgent) {
                await repository.updateAgent(agentIdStr, agentData.name, agentData.is_available, limitInt)
            } else {
                await repository.createAgent(agentIdStr, agentData.name, agentData.is_available, limitInt);
            }
        }

        next();
    } catch (error) {
        logger.error(`Failed to sync agents: ${error}`)

        res.status(500).json({ error: error });
    }
};
