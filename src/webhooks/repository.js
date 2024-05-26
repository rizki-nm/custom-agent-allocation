import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const insertQueue = async (roomId) => {
    return prisma.queue.create({
        data: {
            room_id: roomId,
            resolved: false
        }
    })
}

const findAvailableAgent = async () => {
    const agents = await prisma.agent.findMany({
        where: {
            available: true,
        },
        include: {
            queues: {
                where: {
                    resolved: false,
                },
            },
        },
    });

    // Filter agents based on the limit
    return agents.filter(agent => agent.queues.length < agent.limit || agent.queues.length === 0);
};

const updateQueueWithAgent = async (roomId, agentId) => {
    return prisma.queue.update({
        where: {
            room_id: roomId
        },
        data: {
            agent: {
                connect: {
                    agent_id: agentId
                }
            }
        }
    })
}

const getNextQueue = async () => {
    return prisma.queue.findFirst({
        where: { resolved: false, agent_id: null },
        orderBy: { createdAt: 'asc' },
    });
};

const updateQueueResolvedStatus = async (roomId) => {
    return prisma.queue.update({
        where: { room_id: roomId },
        data: { resolved: true }
    });
};

export default {
    insertQueue,
    findAvailableAgent,
    updateQueueWithAgent,
    getNextQueue,
    updateQueueResolvedStatus
};
