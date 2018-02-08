<template>
  <div id="app">
    <div class="ui vertical segment">

      <div class="ui container">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
h1 {
  letter-spacing: -0.05em;
  font-weight: bold;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#app *:not(.icon) {
  font-family: 'Verdana', Helvetica, Arial, sans-serif !important;
}
</style>
