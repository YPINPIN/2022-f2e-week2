<template>
  <section class="content">
    <div class="content-tabs">
      <router-link :to="{ name: 'ContentFile' }" class="content-tabs-item">
        <img src="../assets/images/icon/ic_file_h.svg" alt="btn-file" />
      </router-link>
      <router-link :to="{ name: 'ContentArchive' }" class="content-tabs-item">
        <img src="../assets/images/icon/ic_archive_h.svg" alt="btn-add" />
      </router-link>
      <router-link :to="{ name: 'ContentTrash' }" class="content-tabs-item">
        <img src="../assets/images/icon/ic_trash_h.svg" alt="btn-trash" />
      </router-link>
    </div>
    <div class="content-bg">
      <router-view></router-view>
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
  position: relative;
  margin: 0 auto;
  width: 75%;
  max-width: 1420px;
  height: 100vh;
  padding: 40px 0 80px;
  &-tabs {
    position: absolute;
    left: -74px;
    top: 145px;
    z-index: 5;
    display: flex;
    flex-direction: column;
    gap: 10px;
    &-item {
      width: 76px;
      height: 88px;
      padding: 24px 12px 24px 24px;
      background: var(--gray-60);
      border: 2px solid var(--gray-70);
      box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.25);
      border-radius: 100px 0px 0px 100px;
      transition-property: background, tborder;
      transition-duration: 0.3s;
      transition-timing-function: ease;
    }
    &-item:hover,
    .router-link-active {
      background: white;
      border: 2px solid var(--primary-default);
    }
  }
  &-bg {
    position: relative;
    z-index: 10;
    margin: 0 auto;
    padding: 40px 28px;
    width: 100%;
    height: 95%;
    background-color: white;
    box-shadow: inset 0px 2px 4px rgba(135, 135, 135, 0.35),
      inset 0px 5px 8px rgba(215, 215, 215, 0.3),
      inset 0px -2px 4px rgba(135, 135, 135, 0.65),
      inset 0px -6px 6px rgba(215, 215, 215, 0.55);
    border-radius: 40px;
    filter: drop-shadow(0px 10px 10px rgba(0, 0, 0, 0.5));
    display: flex;
    flex-direction: column;
  }
}

@media screen and (max-width: 576px) {
  .content {
    padding: 48px 0px 18px;
    width: 95%;
    &-tabs {
      left: 30px;
      top: 8px;
      flex-direction: row;
      &-item {
        width: 48px;
        height: 42px;
        padding: 10px 10px 6px;
        border-radius: 100px 100px 0px 0px;
        img {
          width: 24px;
          height: 24px;
        }
      }
    }
    &-bg {
      padding: 12px;
      border-radius: 20px;
    }
  }
}
</style>
