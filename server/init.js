// Initialize Socket connections and Express routes
const routes = require('./api/routes.js');
const devices = require('./api/devices');
const groups = require('./api/groups');
const moods = require('./api/moods');

module.exports = function (app, sock) {
  routes(app);
  devices.register(sock);
  groups.register(sock);
  moods.register(sock);
};
