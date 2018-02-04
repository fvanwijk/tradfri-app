const { TradfriError, TradfriErrorCodes, Accessory, AccessoryTypes } = require('node-tradfri-client');
const tradfri = require('../tradfri');
const devices = {};

function marshallDevice({ client, ...device }) {
  switch (device.type) {
    case AccessoryTypes.motionSensor:
      device.sensorList = device.sensorList.map(({ client, ...sensor }) => sensor);
      break;
    case AccessoryTypes.lightbulb:
    case 1:
      device.lightList = (device.lightList || []).map(({ client, _accessory, ...light}) => light);
      break;
    case AccessoryTypes.remote:
      device.switchList = device.switchList.map(({ client, ...remote}) => remote);
      break;
    default:
      console.log('Not mapped', device);
  }

  return device;
}

tradfri
  .on('device updated', (device) => {
    devices[device.instanceId] = device;
    //console.log(`Added device ${device.name} (${device.instanceId})`);
  })
  .on('error', e => {
    console.log('device error', e);
  })
  .observeDevices();


module.exports = {
  getAll(req, res) {
    const items = Object.values(devices).map(marshallDevice);

    res.json({
      items,
      status: 'ok'
    });
  },
  async control(req, res) {
    try {
      const light = devices[+req.params.id];
      if (light) {
        const success = await tradfri.operateLight(light, req.body);
        res.json(marshallDevice(light));
      } else {
        res.status(404).send();
      }
    } catch (e) {
      res.json({ status: 'error', error: e });
    }
  }
};
