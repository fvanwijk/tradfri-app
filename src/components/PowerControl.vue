<template>
  <div class="ui fitted toggle checkbox">
    <input
      @change="toggleLight(onOff)"
      :name="instanceId"
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
      onOff: this.value,
    };
  },
  methods: {
    toggleLight(value) {
      TradfriService.controlDevice(this.instanceId, {
        onOff: !!value,
      });
    },
  },
  props: ['instanceId', 'value'],
};
</script>
