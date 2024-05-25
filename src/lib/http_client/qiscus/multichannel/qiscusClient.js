import QiscusMultichannelClient from './client.js';

class QiscusClientSingleton {
    constructor() {
        if (!QiscusClientSingleton.instance) {
            QiscusClientSingleton.instance = new QiscusMultichannelClient(
                process.env.MULTICHANNEL_URL,
                process.env.APP_ID,
                process.env.APP_SECRET_KEY,
            );
        }
    }

    getInstance() {
        return QiscusClientSingleton.instance;
    }
}

const qiscusClientSingleton = new QiscusClientSingleton();
Object.freeze(qiscusClientSingleton);

export default qiscusClientSingleton.getInstance();
