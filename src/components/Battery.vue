<template>
  <span>
    <small>{{value}}%</small>
    <i class="fitted inverted battery icon" :class="batteryClass"></i> |
  </span>
</template>
<style>
</style>
<script>
export default {
  computed: {
    batteryClass() {
      if (this.value < 5) {
        return 'red empty';
      } else if (this.value < 30) {
        return 'black low';
      } else if (this.value < 70) {
        return 'black medium';
      } else if (this.value < 95) {
        return 'black high';
      }

      return 'black full';
    },
  },
  props: ['value'],
};
</script>
