<template>
  <h3 class="content-title">垃圾桶</h3>
  <div class="content-divider"></div>
</template>

<script>
export default {
  name: 'ContentFile',
}
</script>

<style lang="scss" scoped>
.content {
  &-title {
    color: var(--secondary-default);
  }
  &-divider {
    width: 100%;
    height: 2px;
    background-color: var(--primary-default);
    margin-top: 1rem;
  }
}

@media screen and (max-width: 576px) {
  .content {
    &-title {
      padding: 0 16px;
      font-size: 20px;
    }
    &-divider {
      margin-top: 4px;
    }
  }
}
</style>
