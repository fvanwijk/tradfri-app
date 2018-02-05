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
              <div class="ui toggle checkbox" v-if="device.type === 2">
                <input
                  @change="toggleLight(device.instanceId, device.lightList[0].onOff)"
                  :name="device.instanceId"
                  type="checkbox"
                  v-model="device.lightList[0].onOff">
                <label>{{device.lightList[0].onOff}} {{device.name}} ({{device.instanceId}})</label>
              </div>
              <span v-if="device.type !== 2">
                {{device.name}} ({{device.instanceId}})
              </span>
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
  methods: {
    toggleLight(id, value) {
      TradfriService.controlDevice(id, {
        onOff: value,
      });
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

</style>
