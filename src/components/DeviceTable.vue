<template>
  <table class="ui very basic unstackable table">
    <thead>
      <tr>
        <th colspan="2"></th>
        <th>Last seen</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="device in devices" v-bind:key="device.instanceId">
        <td class="collapsing checkbox">
          <div class="ui fitted toggle checkbox" v-if="device.type === 2">
            <input
                @change="toggleLight(device.instanceId, device.lightList[0].onOff)"
                :name="device.instanceId"
                type="checkbox"
                v-model="device.lightList[0].onOff">
            <label></label>
          </div>
        </td>
        <td><span class="ui basic label">
          {{['🕹', '💡', '💡', '', '👋'][device.type]}} {{device.instanceId}}</span>
          {{device.name}}

          <BrightnessControl v-if="device.type === 2 && device.lightList"
                             :instanceId="device.instanceId"
                             :value="device.lightList[0].dimmer" />
        </td>
        <td class="right aligned collapsing">
          {{device.lastSeen*1000 | date('D MMM YYYY')}}
        </td>
        <td class="collapsing">
          <Battery v-if="device.deviceInfo.power === 3"
               :value="device.deviceInfo.battery">
          </Battery>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<style scoped>
  .ui.table td.collapsing.checkbox {
    width: 58px
  }
</style>
<script>
import Battery from './Battery';
import BrightnessControl from './BrightnessControl';
import TradfriService from './TradfriService';

export default{
  components: {
    Battery,
    BrightnessControl,
  },
  methods: {
    toggleLight(id, value) {
      TradfriService.controlDevice(id, {
        onOff: value,
      });
    },
  },
  props: ['devices'],
};
</script>
