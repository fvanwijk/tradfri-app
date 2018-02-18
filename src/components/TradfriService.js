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
  controlDevice(id, settings) {
    return putJson(`/api/tradfri/device/control/${id}`, settings);
  },
  updateDevice(id, device) {
    return putJson(`/api/tradfri/device/${id}`, device);
  },
  getGroups() {
    return getJson('/api/tradfri/group');
  },
  controlGroup(id, settings) {
    return putJson(`/api/tradfri/group/control/${id}`, settings);
  },
  updateGroup(id, group) {
    return putJson(`/api/tradfri/group/${id}`, group);
  },
};
