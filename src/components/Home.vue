<template>
  <div>
    <h1>Trådfri App</h1>

    <div class="ui items">
      <div class="item" v-for="group in groups" v-bind:key="group.instanceId">
        <div class="content">
          <div class="header">{{group.name}}</div>
          <div class="ui unordered list">
            <div
              class="item"
              v-for="device in group.devices"
              v-bind:key="device.instanceId">
                {{device.name}} ({{device.instanceId}})
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TradfriService from './TradfriService';

export default {
  name: 'Home',
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

</style>
