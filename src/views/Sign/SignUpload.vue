<template>
  <section class="sign-upload">
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect
        x="0"
        y="0"
        rx="20"
        ry="20"
        width="100%"
        height="100%"
        fill="transparent"
        stroke="black"
        stroke-width="2px"
        stroke-dasharray="8"
      />
    </svg>
    <div class="upload-action">
      <img
        class="upload-action-icon"
        src="@/assets/images/other/img_photo.svg"
        alt="upload-action-icon"
      />
      <router-link :to="{ name: '' }" class="upload-action-btn">
        <span class="highlight">選擇檔案</span>
      </router-link>
      <h5 class="upload-action-title">或者將檔案拖曳到這裡</h5>
      <p class="upload-action-info">
        僅支援 PDF、JPG、PNG 檔案，且容量不超過 20MB。
      </p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SignUpload',
}
</script>

<style lang="scss" scoped>
.sign-upload {
  position: relative;
  height: 100%;
  padding: 5px;
  svg {
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 20px;
    rect {
      stroke: var(--secondary-default);
    }
  }
}

.upload {
  &-action {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    &-btn {
      height: 41px;
      margin-top: 28px;
      margin-bottom: 32px;
      padding: 8px 28px;
      background: var(--secondary-default);
      border: 2px solid var(--primary-default);
      border-radius: 50px;
      .highlight {
        color: var(--primary-default);
        line-height: 100%;
      }
      &:hover {
        background: var(--primary-default);
        span {
          color: var(--secondary-default);
        }
      }
    }
    &-title,
    &-info {
      color: var(--gray-40);
      margin-bottom: 12px;
    }
  }
}
</style>
