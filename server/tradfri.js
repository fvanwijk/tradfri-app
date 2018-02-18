const { hostname, identity, psk } = require('./config.json');
const { TradfriClient } = require('node-tradfri-client');

const tradfri = new TradfriClient(hostname, {
  customLogger: (msg, severity) => {
    switch (severity) {
      case 'silly':
        break;
      case 'debug':
        console.log('\x1b[2m%s\x1b[0m', '[DEBUG]', msg);
        break;
      case 'info':
        console.info('\x1b[34m%s\x1b[0m', '[INFO]', msg);
        break;
      case 'warn':
        console.warn('\x1b[33m%s\x1b[0m', '[WARN]', msg);
        break;
      case 'error':
        console.error('\x1b[31m%s\x1b[0m', '[ERROR]', msg);
        break;
    }
  }
});
tradfri.connect(identity, psk);

module.exports = tradfri;
