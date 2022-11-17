<template>
  <Navbar />
  <h1>大標題 1</h1>
  <router-link to="/">home</router-link>
  <router-link to="/about">about</router-link>
  <router-view></router-view>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  components: {
    Navbar,
  },
}
</script>

<style lang="scss"></style>
