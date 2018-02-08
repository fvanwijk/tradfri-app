<template>
  <div class="ui segment">
    <div class="ui divided relaxed items">
      <div class="item" v-for="device in devices" v-bind:key="device.instanceId">
        <div class="content">
        <span class="ui header">
          {{device.name}}
          <PowerControl v-if="device.type === 2" :item="device"/>
        </span>

          <div class="meta">
            <i class="clock icon"></i> {{device.lastSeen*1000 | date('D MMM YYYY HH:mm')}}
          </div>

          <div class="description" v-if="device.type === 0 || device.type === 4">
            <div class="ui basic padded segment">
              <Battery v-if="device.deviceInfo.power === 3"
                       :value="device.deviceInfo.battery">
              </Battery>
            </div>
          </div>
          <div class="description" v-if="device.type === 2">
            <div class="ui basic padded segment">
              <BrightnessControl v-if="device.type === 2"
                                 :instanceId="device.instanceId"
                                 :value="device.lightList[0].dimmer"/>
              <ColorControl v-if="device.type === 2 && device.lightList[0]._spectrum === 'rgb'"
                            :instanceId="device.instanceId"
                            :value="device.lightList[0].color"/>
            </div>
          </div>
          <small class="extra">
            <span class="ui basic label">
              {{['🕹', '💡', '💡', '', '👋'][device.type]}} {{device.instanceId}}
            </span>
            <span>{{device.deviceInfo.modelNumber}} v{{device.deviceInfo.firmwareVersion}}</span>
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
</style>
<script>
import Battery from './Battery';
import BrightnessControl from './BrightnessControl';
import ColorControl from './ColorControl';
import PowerControl from './PowerControl';

export default{
  components: {
    Battery,
    BrightnessControl,
    ColorControl,
    PowerControl,
  },
  props: ['devices'],
};
</script>
