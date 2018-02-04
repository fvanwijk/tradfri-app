const getJson = path => fetch(path).then(res => res.json());

export default {
  getDevices() {
    return getJson('/api/tradfri/devices');
  },
  getGroups() {
    return getJson('/api/tradfri/groups');
  }
}
