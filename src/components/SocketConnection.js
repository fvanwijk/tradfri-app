import SockJS from 'sockjs-client';

const sockjs = new SockJS('http://localhost:8081/updates');

sockjs.onopen = () => console.log('[*] open', sockjs.protocol);
sockjs.onclose = () => console.log('[*] close');

const messageHandlers = {
  device: [],
  group: [],
};

sockjs.onmessage = e => {
  const { id, type, payload } = JSON.parse(e.data);
  messageHandlers[type].forEach(handler => {
    handler(id, payload);
  });
};

export default {
  registerMessageHandler(type, cb) {
    messageHandlers[type].push(cb);
  },
  unregisterMessageHandlers(type) {
    messageHandlers[type] = [];
  },
};
