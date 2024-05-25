import axios from "axios";
import repository from "./repository.js";
import dotenv from "dotenv";

dotenv.config();

const assignService = async (email, name, roomId) => {
    // Save customer
    try {
        await repository.insertCustomer(email, name, roomId);
    } catch (error) {
        return false;
    }

    // Get Customer Data
    const customerData = await repository.findCustomerByRoomId(roomId);

    // Get & save active agents
    // do axios Get All Agent -> filter is_available = true -> save to db (agents.id is unique)
    // const activeAgentsId = getActiveAgents();

    // Get available agents
    const agentData = await repository.getAvailableAgent(process.env.MAX_AGENT_HANDLE);

    if (agentData.rows.length > 0) {
        const agentId = agentData.rows[0].id;
        const agentName = agentData.rows[0].name;
        const customerId = customerData.id;

        // Simpan informasi tentang agent yang menangani customer
        await repository.insertAgentAndCustomer(agentId, customerId);

        assignAgentCallback(roomId, agentId);

        return agentName;
    }
}

const resolveService = async (roomId) => {
    // Search customerId where room_id is resolve
    const customerResolveData = await repository.findCustomerByRoomId(roomId);

    // Tandai room_id yang telah selesai
    repository.updateResolveRoom(customerResolveData.id)

    // Ambil agent_id yang sudah resolved
    const agentResult = await repository.getAgentResolve(customerResolveData.id);

    // Ambil room_id sesuai antrian
    const nextCustResult = await repository.getNextCust();

    if (nextCustResult.rows.length > 0) {
        const nextCustId = nextCustResult.rows[0].id;
        const nextCustName = nextCustResult.rows[0].name;
        const nextRoomId = nextCustResult.rows[0].room_id;
        const agentId = agentResult.id;
        const agentName = agentResult.name;

        // Simpan informasi tentang agent yang menangani customer
        await repository.insertAgentAndCustomer(agentId, nextCustId);

        assignAgentCallback(nextRoomId, agentId);

        return { nextCustName, nextRoomId, agentName };
    }
}

const assignAgentCallback = async (roomId, agentId) => {
    const bodyFormData = new FormData()
    bodyFormData.set('room_id', roomId)
    bodyFormData.set('agent_id', agentId)

    await axios({
        url: 'https://multichannel-api.qiscus.com/api/v1/admin/service/assign_agent',
        method: "post",
        data: bodyFormData,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Qiscus-App-Id": "jukoq-ncfp5hjfigfk5yi",
            "Qiscus-Secret-Key": "61df78fa39fe29e3518f9097636b5f9e",
        }
    })
}

export default {
    assignService,
    resolveService,
    assignAgentCallback,
}