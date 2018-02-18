<template>
  <div>
    <h1>Trådfri App</h1>

    <div v-for="group in groups" v-bind:key="group.instanceId" class="group">
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
import TradfriService from './TradfriService';

export default {
  name: 'Home',
  components: {
    BrightnessControl,
    Devices,
    Label,
    PowerControl,
  },
  data() {
    return {
      groups: [],
    };
  },
  methods: {
    updateGroupName(group, name) {
      TradfriService.updateGroup(group.instanceId, { name: name.trim() });
    },
  },
  async mounted() {
    const devices = (await TradfriService.getDevices()).items;

    this.groups = (await TradfriService.getGroups()).items.map(group => ({
      ...group,
      devices: group.deviceIDs.map(deviceID =>
        devices.find(device => deviceID === device.instanceId)),
    }));
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
