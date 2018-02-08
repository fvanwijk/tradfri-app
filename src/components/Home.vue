<template>
  <div>
    <h1>Trådfri App</h1>

    <div v-for="group in groups" v-bind:key="group.instanceId" class="group">
      <h2 class="ui header">
        {{group.name}}
        <PowerControl :item="group"/>
        <span class="sub header">{{group.instanceId}}</span>
      </h2>
      <Devices :devices="group.devices"></Devices>
    </div>
  </div>
</template>

<script>
import Devices from './Devices';
import PowerControl from './PowerControl';
import TradfriService from './TradfriService';

export default {
  name: 'Home',
  components: {
    Devices,
    PowerControl,
  },
  data() {
    return {
      groups: [],
    };
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
</style>
