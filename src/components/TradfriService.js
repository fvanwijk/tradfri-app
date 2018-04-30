const getJson = path => fetch(path).then(res => res.json());
const putJson = (path, payload) => fetch(path, {
  method: 'PUT',
  headers: new Headers({ 'Content-Type': 'application/json; charset=utf-8' }),
  body: JSON.stringify(payload),
}).then(res => res.json());

export default {
  getDevices() {
    return getJson('/api/tradfri/device');
  },
  getDevice(id) {
    return getJson(`/api/tradfri/device/${id}`);
  },
  controlDevice(id, settings) {
    return putJson(`/api/tradfri/device/control/${id}`, settings);
  },
  isColorDevice(device) {
    return device.lightList[0]._spectrum === 'rgb'
      || ['TRADFRI bulb E27 CWS opal 600lm', 'LCT015'].includes(device.deviceInfo.modelNumber);
  },
  updateDevice(id, device) {
    return putJson(`/api/tradfri/device/${id}`, device);
  },
  getGroups() {
    return getJson('/api/tradfri/group');
  },
  getGroup(id) {
    return getJson(`/api/tradfri/group/${id}`);
  },
  controlGroup(id, settings) {
    return putJson(`/api/tradfri/group/control/${id}`, settings);
  },
  updateGroup(id, group) {
    return putJson(`/api/tradfri/group/${id}`, group);
  },
};
