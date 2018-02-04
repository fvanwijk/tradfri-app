const getJson = path => fetch(path).then(res => res.json());
const putJson = (path, payload) => fetch(path, {
  method: 'PUT',
  body: JSON.stringify(payload)
}).then(res => res.json());

export default {
  getDevices() {
    return getJson('/api/tradfri/device');
  },
  controlDevice(id, settings) {
    return putJson(`/api/tradfri/device/${id}`, settings);
  },
  getGroups() {
    return getJson('/api/tradfri/group');
  },
};
