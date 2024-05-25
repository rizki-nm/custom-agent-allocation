import { PrismaClient } from '@prisma/client';
import { logger } from "../application/logging.js";
import qiscusClient from "../lib/http_client/qiscus/multichannel/qiscusClient.js";

const prisma = new PrismaClient();

export default async (req, res, next) => {
    try {
        const agents = await qiscusClient.syncAgents();

        for (const agentData of agents.data.agents) {
            const agentIdStr = agentData.id.toString();
            const limitInt = parseInt(process.env.MAX_AGENT_HANDLE, 10);

            const existingAgent = await prisma.agent.findUnique({
                where: {
                    agent_id: agentIdStr
                }
            });

            if (existingAgent) {
                await prisma.agent.update({
                    where: {
                        agent_id: agentIdStr
                    },
                    data: {
                        name: agentData.name,
                        available: agentData.is_available,
                        limit: limitInt
                    }
                });
            } else {
                await prisma.agent.create({
                    data: {
                        agent_id: agentIdStr,
                        name: agentData.name,
                        available: agentData.is_available,
                        limit: limitInt
                    }
                });
            }
        }

        next();
    } catch (error) {
        logger.error(`Failed to sync agents: ${error}`)

        res.status(500).json({ error: error });
    }
};
