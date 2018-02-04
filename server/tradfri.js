const { hostname, identity, psk } = require('./config.json');
const { TradfriClient } = require('node-tradfri-client');

const tradfri = new TradfriClient(hostname);
tradfri.connect(identity, psk);

module.exports = tradfri;
