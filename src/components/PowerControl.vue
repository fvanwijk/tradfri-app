<template>
  <div class="ui fitted toggle checkbox">
    <input
      @change="toggle(onOff)"
      :name="item.instanceId"
      type="checkbox"
      v-model="onOff">
    <label></label>
  </div>
</template>
<style>
</style>
<script>
import TradfriService from './TradfriService';

export default {
  data() {
    return {
      onOff: this.item.deviceInfo ? this.item.lightList[0].onOff : this.item.onOff,
    };
  },
  methods: {
    toggle(value) {
      TradfriService[this.item.deviceInfo ? 'controlDevice' : 'controlGroup'](this.item.instanceId, {
        onOff: !!value,
      });
    },
  },
  props: ['item'],
};
</script>
