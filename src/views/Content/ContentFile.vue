<template>
  <h3 class="content-title">我的文件</h3>
  <div class="content-divider"></div>
  <div class="content-add">
    <router-link :to="{ name: 'Sign' }" class="content-add-btn">
      <img src="@/assets/images/button/ic_add_dark.svg" alt="btn-add" />
    </router-link>
    <h2 class="content-add-text">快來建立新檔吧</h2>
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
  &-add {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &-btn {
      transition: transform 0.2s ease-in-out;
    }
    &-btn:hover {
      transform: scale(0.9);
    }
    &-text {
      margin-top: 28px;
      color: var(--secondary-default);
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
    &-add {
      &-btn {
        img {
          width: 80px;
          height: 80px;
        }
      }
      &-text {
        margin-top: 20px;
      }
    }
  }
}
</style>
