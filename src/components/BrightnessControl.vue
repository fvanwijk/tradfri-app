<template>
  <input
    @change="setBrightness(dimmer)"
    type="range"
    min="0"
    max="100"
    v-model="dimmer" />
</template>
<style>
</style>
<script>
import TradfriService from './TradfriService';

export default {
  data() {
    return {
      dimmer: this.value,
    };
  },
  methods: {
    setBrightness(value) {
      TradfriService.controlDevice(this.instanceId, {
        dimmer: +value,
      });
    },
  },
  props: ['instanceId', 'value'],
};
</script>
