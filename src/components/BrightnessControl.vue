<template>
  <input
    @change="setBrightness($event.target.value)"
    type="range"
    min="0"
    max="100"
    :value="dimmer"/>
</template>
<style>
</style>
<script>
import TradfriService from './TradfriService';

export default {
  computed: {
    dimmer() {
      return this.item.deviceInfo ? this.item.lightList[0].dimmer : this.item.dimmer;
    },
  },
  methods: {
    setBrightness(value) {
      TradfriService[this.item.deviceInfo ? 'controlDevice' : 'controlGroup'](this.item.instanceId, {
        dimmer: +value,
      });
    },
  },
  props: ['item'],
};
</script>
