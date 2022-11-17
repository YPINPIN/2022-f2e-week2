<template>
  <Navbar />
  <main>
    <router-view></router-view>
  </main>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  components: {
    Navbar,
  },
}
</script>

<style lang="scss">
body {
  overflow: hidden;
  height: 100vh;
  background-color: var(--bg-color);
  background-image: url('./assets/images/other/bg_decorate.svg');
  background-repeat: no-repeat;
  background-position: center bottom;
}
</style>
