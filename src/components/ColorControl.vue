<template>
  <input
    @change="setColor(color)"
    type="color"
    v-model="color" />
</template>
<style>
</style>
<script>
import TradfriService from './TradfriService';

export default {
  data() {
    return {
      color: `#${this.value}`,
    };
  },
  methods: {
    setColor(value) {
      TradfriService.controlDevice(this.instanceId, {
        color: value.slice(1),
      });
    },
  },
  props: ['instanceId', 'value'],
};
</script>
