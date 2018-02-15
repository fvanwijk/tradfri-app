<template>
  <span>{{deviceInfo.modelNumber}} v{{deviceInfo.firmwareVersion}}</span>
</template>
<style>
</style>
<script>
export default{
  props: ['deviceInfo'],
};
</script>
