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

module.exports = {
  register(sock) {
    let sockConnection;
    sock.on('connection', conn => sockConnection = conn);

    tradfri
      .on('device updated', (device) => {
        //console.log(`Device update: ${device.name} (${device.instanceId})`);
        sockConnection && sockConnection.write(`Device update: ${device.name} (${device.instanceId})`);
        devices[device.instanceId] = device;
      })
      .on('device removed', (id) => {
        // console.log(`Device removed: ${id})`);
        delete devices[id];
      })
      .on('error', ({ message }) => {
        console.log('device error', message);
      })
      .observeDevices();
  },
  get(req, res) {
    const light = devices[+req.params.id];
    if (light) {
      res.json(marshallDevice(light));
    } else {
      res.status(404).send();
    }
  },
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
    } catch ({ message }) {
      res.json({ status: 'error', error: message });
    }
  },
  async update(req, res) {
    try {
      const light = devices[+req.params.id];
      if (light) {
        const newLight = light.clone().merge(req.body);
        const success = await tradfri.updateDevice(newLight);
        res.json((({ client, ...rest }) => rest)(newLight));
      } else {
        res.status(404).send();
      }
    } catch ({ message }) {
      res.json({ status: 'error', error: message });
    }
  },
};
