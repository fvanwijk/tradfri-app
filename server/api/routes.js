const controllers = require('./controller');

module.exports = function (app) {
  app.route('/tradfri/devices').get(controllers.devices.getAll);
  app.route('/tradfri/groups').get(controllers.groups.getAll);
};
