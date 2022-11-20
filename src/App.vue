<template>
  <Navbar />
  <main>
    <router-view></router-view>
  </main>
  <NewSignModal v-show="isNewSignModalOpen" @close="handleNewSignModalClose" />
</template>

<script>
import Navbar from './components/Navbar.vue'
import { mapState } from 'vuex'
import NewSignModal from './components/NewSignModal.vue'

export default {
  components: {
    Navbar,
    NewSignModal,
  },
  computed: {
    ...mapState(['isNewSignModalOpen']),
  },
  methods: {
    // 關閉Modal
    handleNewSignModalClose() {
      this.$store.dispatch('isNewSignModalOpen', false)
    },
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
