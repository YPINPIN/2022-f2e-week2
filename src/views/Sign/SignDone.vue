<template>
  <section class="sign-done">
    <div class="sign-done-preview">
      <div class="preview-wrapper">
        <img ref="previewImage" class="preview-image" />
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'SignDone',
  mounted() {
    this.$refs.previewImage.src = this.editFileImage
  },
  computed: {
    ...mapState(['editFileImage']),
  },
}
</script>

<style lang="scss" scoped>
.sign-done {
  height: 100%;
  padding-top: 24px;
  border-top: 2px solid var(--primary-default);
  &-preview {
    margin: 0 auto;
    position: relative;
    width: 77%;
    max-width: 724px;
    height: 90%;
    background: var(--gray-30);
    border: 2px solid var(--gray-30);
    overflow: auto;
    .preview {
      &-wrapper {
        width: 100%;
        padding: 40px;
      }
      &-image {
        width: 100%;
      }
    }
  }
}

@media screen and (max-width: 576px) {
  .sign-done {
    padding-top: 60px;
  }
}
</style>
