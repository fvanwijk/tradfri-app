<template>
  <span class="ui basic fitted label">
    {{['🕹', '💡', '💡', '', '👋'][device.type]
    }}<i v-if="device.type === undefined" class="fitted group object icon"></i>{{device.instanceId}}
  </span>
</template>
<style>
.ui.header .fitted.label {
  margin-left: 0;
}
.ui.header .fitted.label i {
  margin-right: 0.3rem;
}
</style>
<script>
export default{
  props: ['device'],
};
</script>
