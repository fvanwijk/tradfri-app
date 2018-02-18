<template>
  <div class="ui segment">
    <div class="ui divided relaxed items">
      <div class="item" v-for="device in devices" v-bind:key="device.instanceId">
        <div class="content">
        <span class="ui header">
          <span contenteditable @blur="updateDeviceName(device, $event.target.innerText)">
            {{device.name}}
          </span>
          <PowerControl v-if="device.type === 2" :item="device"/>
        </span>

          <div class="meta">
            <Timestamp :timestamp="device.lastSeen" />
          </div>

          <div class="description" v-if="device.type === 2">
            <div class="ui basic padded segment">
              <BrightnessControl v-if="device.type === 2" :item="device" />
              <ColorControl v-if="device.type === 2 && device.lightList[0]._spectrum === 'rgb'"
                            :instanceId="device.instanceId"
                            :value="device.lightList[0].color"/>
            </div>
          </div>
          <small class="extra">
            <Label :device="device" />
            <span>
              <Battery v-if="device.deviceInfo.power === 3" :value="device.deviceInfo.battery" />
              <DeviceModel :deviceInfo="device.deviceInfo" />
            </span>
          </small>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .ui.table td.collapsing.checkbox {
    width: 58px
  }
  .ui.table tr:nth-child(2) {
    background-color: rgb(250,250,250);
  }
  .ui.table tr:last-child td {
    border-top: none;
    border-bottom: 1px solid rgba(34, 36, 38, 0.1);
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
<script>
import Battery from './Battery';
import BrightnessControl from './BrightnessControl';
import ColorControl from './ColorControl';
import DeviceModel from './DeviceModel';
import Label from './Label';
import PowerControl from './PowerControl';
import Timestamp from './Timestamp';
import TradfriService from './TradfriService';

export default{
  components: {
    Battery,
    BrightnessControl,
    ColorControl,
    DeviceModel,
    Label,
    PowerControl,
    Timestamp,
  },
  methods: {
    updateDeviceName(device, name) {
      TradfriService.updateDevice(device.instanceId, { name: name.trim() });
    },
  },
  props: ['devices'],
};
</script>
