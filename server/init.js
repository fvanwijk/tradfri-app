// Initialize Socket connections and Express routes
const routes = require('./api/routes.js');
const devices = require('./api/devices');
const groups = require('./api/groups');

module.exports = function (app, sock) {
  routes(app);
  devices.register(sock);
  groups.register(sock);
};
