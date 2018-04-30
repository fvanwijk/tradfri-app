<template>
  <input
    @change="setColor($event.target.value)"
    type="color"
    :value="hex"/>
</template>
<style>
</style>
<script>
  import TradfriService from './TradfriService';
  import { rgb } from 'd3-color';
  import xyBriToRgb from '../lib/xyBriToRgb';
  import { cie_to_rgb, rgb_to_cie } from '../lib/cieRgbConverter';

  const toHex = decimal => {
    const hex = decimal.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  export default {
    computed: {
      hex() {
        if (this.light.colorX) {
          const { r, g, b} = xyBriToRgb(this.light.colorX / 65279, this.light.colorY / 65279);
          return `#${[r, g, b].map(toHex).join('')}`;
        }

        return;
      }
    },
    methods: {
      setColor(hex) {
        const { r: red, g: green, b: blue } = rgb(hex);
        const [a, b] = rgb_to_cie(red, green, blue);

        TradfriService.controlDevice(this.instanceId, {
          //color: hex.slice(1), Not supported by Philips Hue bulbs
          colorX: Math.round(a * 65279),
          colorY: Math.round(b * 65279)
        });
      }
    },
    props: ['instanceId', 'light'],
  }
  ;
</script>
