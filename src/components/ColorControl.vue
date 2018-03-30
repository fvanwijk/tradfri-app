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
import { rgb } from 'd3-color';
import { rgb_to_cie } from '../lib/cieRgbConverter';

export default {
  data() {
    return {
      color: `#${this.value}`,
    };
  },
  methods: {
    setColor(value) {
      const { r: red, g: green, b: blue } = rgb(value);
      const [a, b] = rgb_to_cie(red, green, blue);

      TradfriService.controlDevice(this.instanceId, {
        //color: value.slice(1), Not supported by Philips Hue bulbs
        colorX: Math.round(a * 65279),
        colorY: Math.round(b * 65279)
      });
    },
  },
  props: ['instanceId', 'value'],
};
</script>
