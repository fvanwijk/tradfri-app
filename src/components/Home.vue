<template>
  <div>
    <h1>{{msg}}</h1>
    <div class="ui unordered list">
      <div class="item" v-for="item in items" :key="item.instanceId">{{item.name}}</div>
    </div>
  </div>
</template>

<script>
import TradfriService from './TradfriService';

export default {
  name: 'Home',
  data() {
    return {
      msg: 'Trådfri App',
      items: [],
    };
  },
  async mounted() {
    this.items = (await TradfriService.getDevices()).items;
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
