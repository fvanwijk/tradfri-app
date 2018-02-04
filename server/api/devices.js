const { TradfriError, TradfriErrorCodes, Accessory, AccessoryTypes } = require('node-tradfri-client');
const tradfri = require('../tradfri');
const devices = [];

tradfri
  .on('device updated', (device) => {
    devices.push(device);
    //console.log(`Added device ${device.name} (${device.instanceId})`);
  })
  .on('error', e => {
    console.log('device error', e);
  })
  .observeDevices();


module.exports = {
  getAll(req, res) {
    const items = devices.map(device => {
      delete device.client;

      switch(device.type) {
        case AccessoryTypes.motionSensor:
          device.sensorList = device.sensorList.map(sensor => {
            delete sensor.client;
            return sensor;
          });
          break;
        case AccessoryTypes.lightbulb:
        case 1:
          device.lightList = (device.lightList || []).map(light => {
            delete light.client;
            delete light._accessory;
            return light;
          });
          break;
        case AccessoryTypes.remote:
          device.switchList = device.switchList.map(remote => {
            delete remote.client;
            return remote;
          });
          break;
        default:
          console.log('Not mapped', device);
      }

      return device
    });

    res.json({
      items,
      status: 'ok'
    });
  }
};
