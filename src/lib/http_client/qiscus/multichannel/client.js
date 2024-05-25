import axios from 'axios';

class QiscusMultichannelClient {
    constructor(baseURL, appId, secretKey) {
        this.client = axios.create({
            baseURL,
            headers: {
                'Content-Type': 'application/json',
                'Qiscus-App-Id': appId,
                'Qiscus-Secret-Key': secretKey
            }
        });
    }

    async syncAgents() {
        try {
            const response = await this.client.get('/api/v2/admin/agents?user_type_scope=agent');
            return response.data;
        } catch (error) {
            throw new Error(error);
        }
    }

    async assignAgent(roomId, agentId) {
        try {
            // TODO:
            const response = await this.client.post('/', { room_id: roomId, agent_id: agentId });
            return response.data;
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default QiscusMultichannelClient;