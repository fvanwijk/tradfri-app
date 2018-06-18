const controllers = require('./controller');

module.exports = function (app) {
  app.route('/tradfri/device').get(controllers.devices.getAll);
  app.route('/tradfri/device/:id').get(controllers.devices.get);
  app.route('/tradfri/device/control/:id').put(controllers.devices.control);
  app.route('/tradfri/device/:id').put(controllers.devices.update);
  app.route('/tradfri/group').get(controllers.groups.getAll);
  app.route('/tradfri/group/:id').get(controllers.groups.get);
  app.route('/tradfri/group/control/:id').put(controllers.groups.control);
  app.route('/tradfri/group/:id').put(controllers.groups.update);
  app.route('/tradfri/mood').get(controllers.moods.getAll);
};
