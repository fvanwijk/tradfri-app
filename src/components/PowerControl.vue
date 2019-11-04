<template>
  <div class="ui fitted toggle checkbox">
    <input
      @change="toggle($event.target.checked)"
      :name="item.instanceId"
      type="checkbox"
      :checked="onOff">
    <label></label>
  </div>
</template>
<style>
</style>
<script>
import TradfriService from './TradfriService';

export default {
  computed: {
    onOff() {
      return this.item.deviceInfo ? this.item.lightList[0].onOff : this.item.onOff;
    },
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
