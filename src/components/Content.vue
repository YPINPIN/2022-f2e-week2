<template>
  <section class="content">
    <div class="content-bg">
      <h3 class="content-title">我的文件</h3>
      <div class="content-divider"></div>
      <div class="content-add">
        <button class="content-add-btn">
          <img src="@/assets/images/button/ic_add_dark.svg" alt="btn-add" />
        </button>
        <h2 class="content-add-text">快來建立新檔吧</h2>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Content',
}
</script>

<style lang="scss" scoped>
.content {
  height: 100vh;
  padding: 40px 0 80px;
  &-bg {
    margin: 0 auto;
    padding: 40px 28px;
    width: 75%;
    max-width: 1420px;
    height: 95%;
    background-color: white;
    box-shadow: inset 0px 2px 4px rgba(135, 135, 135, 0.35),
      inset 0px 5px 8px rgba(215, 215, 215, 0.3),
      inset 0px -2px 4px rgba(135, 135, 135, 0.65),
      inset 0px -6px 6px rgba(215, 215, 215, 0.55);
    border-radius: 40px;
    display: flex;
    flex-direction: column;
  }
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
      transition: all 0.2s ease-in-out;
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
    padding: 48px 0px 18px;
    &-bg {
      padding: 12px;
      width: 95%;
      border-radius: 20px;
    }
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
