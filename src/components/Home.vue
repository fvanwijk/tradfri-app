<template>
  <div>
    <h1>{{msg}}</h1>
    <div class="ui unordered list">
      <div class="item" v-for="item in items" :key="item.instanceId">{{item.name}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      msg: 'Trådfri App',
      items: [],
    };
  },
  mounted() {
    fetch('/api/tradfri/devices').then(res => res.json()).then((res) => {
      this.items = res.items;
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
