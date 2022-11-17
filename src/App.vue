<template>
  <Navbar />
  <main>
    <Content />
  </main>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Content from './components/Content.vue'

export default {
  components: {
    Navbar,
    Content,
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
