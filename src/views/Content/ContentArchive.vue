<template>
  <h3 class="content-title">已封存的文件</h3>
  <div class="content-divider"></div>
  <div class="content-empty">
    <img
      class="content-empty-icon"
      src="@/assets/images/other/img_archive.svg"
      alt="archive-empty-icon"
    />
    <h5 class="content-empty-text">沒有任何項目</h5>
    <p>封存的項目會顯示在這裡</p>
  </div>
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
  &-empty {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &-text {
      margin-top: 30px;
      margin-bottom: 12px;
      color: var(--gray-40);
    }
    p {
      color: var(--gray-40);
    }
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
