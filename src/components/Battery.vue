<template>
  <span><small>{{value}}%</small> <i class="fitted battery icon" :class="batteryClass"></i></span>
</template>
<style>
</style>
<script>
export default {
  computed: {
    batteryClass() {
      if (this.value < 5) {
        return 'empty';
      } else if (this.value < 30) {
        return 'low';
      } else if (this.value < 70) {
        return 'medium';
      } else if (this.value < 95) {
        return 'high';
      }

      return 'full';
    },
  },
  props: ['value'],
};
</script>
