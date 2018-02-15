<template>
  <span><i class="clock icon"></i> {{timestamp*1000 | date('D MMM YYYY HH:mm')}}</span>
</template>
<script>
export default{
  props: ['timestamp'],
};
</script>
