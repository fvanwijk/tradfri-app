<template>
  <div>
    <h1>Trådfri App</h1>

    <div v-for="group in groupedDevices" v-bind:key="group.instanceId" class="group">
      <h2 class="ui header">
        <span contenteditable
              @blur="updateGroupName(group, $event.target.innerText)">{{group.name}}</span>
        <PowerControl :item="group"/>
      </h2>

      <Label :device="group" />
      <BrightnessControl :item="group" />

      <Devices :devices="group.devices"></Devices>
    </div>
  </div>
</template>

<script>
import BrightnessControl from './BrightnessControl';
import Devices from './Devices';
import Label from './Label';
import PowerControl from './PowerControl';
import SocketConnection from './SocketConnection.js';
import TradfriService from './TradfriService';

export default {
  name: 'Home',
  components: {
    BrightnessControl,
    Devices,
    Label,
    PowerControl,
  },
  computed: {
    groupedDevices() {
      return this.groups.map(group => ({
        ...group,
        devices: group.deviceIDs.map(deviceID =>
          this.devices.find(device => deviceID === device.instanceId)),
        moods: group.moodIDs.map(moodID =>
          this.moods.find(mood => moodID === mood.instanceId)),
      }));
    },
  },
  data() {
    return {
      devices: [],
      groups: [],
      moods: [],
    };
  },
  methods: {
    updateGroupName(group, name) {
      TradfriService.updateGroup(group.instanceId, { name: name.trim() });
    },
  },
  async mounted() {
    this.devices = (await TradfriService.getDevices()).items;
    this.groups = (await TradfriService.getGroups()).items;
    this.moods = (await TradfriService.getMoods()).items;

    SocketConnection.registerMessageHandler('device', (id, payload) => {
      this.devices = this.devices.map(device => (id === device.instanceId ? payload : device));
      console.log('device', id, payload);
    });

    SocketConnection.registerMessageHandler('group', (id, payload) => {
      console.log('group', id, payload);
      this.groups = this.groups.map(group => (id === group.instanceId ? payload : group));
    });
  },
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .group {
    margin-bottom: 2em;
  }
  [contenteditable] {
    cursor: context-menu;
  }
  [contenteditable]:hover,
  [contenteditable]:focus {
    border-bottom: 1px dashed rgba(0, 0, 0, 0.1);
    color: rgba(0, 0, 0, 0.6);
  }
</style>
