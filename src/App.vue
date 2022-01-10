<template>
  <div id="app">
    <nav-bar v-if="!$route.meta.hideNavbar" />
    <router-view />
  </div>
</template>
<script>
import NavBar from "@/components/Home/NavBar/index.vue";
export default {
  components: {
    NavBar,
  },
};
</script>
<style>
body {
  margin: 0;
  padding: 0;
  background-color: #0f171e;
}
html,
body {
  margin: 0;
  height: 100%;
}
</style>
