import { db } from "../application/database.js";

const findCustomerByRoomId = async (roomId) => {
    const query = 'SELECT id, name FROM customers WHERE room_id = $1';
    const result = await db.query(query, [roomId]);

    return result.rows[0];
}

const insertCustomer = async (email, name, roomId) => {
    const query = 'INSERT INTO customers (email, name, room_id) VALUES ($1, $2, $3)';
    return await db.query(query, [email, name, roomId]);
}

const getAvailableAgent = async (max) => {
    const query = 'SELECT id, name FROM agents WHERE id NOT IN (SELECT agent_id FROM agent_customer_mapping WHERE resolved = false GROUP BY agent_id HAVING COUNT(agent_id) >= $1) LIMIT 1';
    const result = await db.query(query, [max]);

    return result;
}

const insertAgentAndCustomer = async (agentId, customerId) => {
    const query = 'INSERT INTO agent_customer_mapping (agent_id, customer_id) VALUES ($1, $2)';
    await db.query(query, [agentId, customerId]);
}

const updateResolveRoom = async (customerId) => {
    const query = 'UPDATE agent_customer_mapping SET resolved = true WHERE customer_id = $1';
    await db.query(query, [customerId]);
}

const getAgentResolve = async (customerId) => {
    // const query = 'SELECT agent_id FROM agent_customer_mapping WHERE customer_id = $1';
    const query = 'SELECT id, name FROM agents WHERE id IN (SELECT agent_id FROM agent_customer_mapping WHERE customer_id = $1)';
    const result = await db.query(query, [customerId]);

    return result.rows[0];
}

const getNextCust = async () => {
    const query = `
    SELECT id, name, room_id
    FROM customers
    WHERE id NOT IN (
      SELECT customer_id
      FROM agent_customer_mapping
    )
    ORDER BY timestamp ASC;
    `;
    const result = await db.query(query);

    return result;
}

export default {
    insertCustomer,
    findCustomerByRoomId,
    getAvailableAgent,
    insertAgentAndCustomer,
    updateResolveRoom,
    getAgentResolve,
    getNextCust,
}