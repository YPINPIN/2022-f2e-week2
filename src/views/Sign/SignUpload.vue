<template>
  <section class="sign-upload">
    <div class="sign-upload-bg">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          v-if="!hasUpload"
        >
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
      </div>
    </div>

    <div class="upload-action" v-if="!hasUpload">
      <img
        class="upload-action-icon"
        src="@/assets/images/other/img_photo.svg"
        alt="upload-action-icon"
      />
      <input
        ref="fileUpload"
        type="file"
        accept="application/pdf"
        @change="onUploadFileChange"
        hidden
      />
      <button class="upload-action-btn" @click.prevent="fileUploadClick">
        選擇檔案
      </button>
      <h5 class="upload-action-title">或者將檔案拖曳到這裡</h5>
      <p class="upload-action-info">
        僅支援 PDF、JPG、PNG 檔案，且容量不超過 20MB。
      </p>
    </div>
    <div class="upload-preview" v-show="hasUpload">
      <div class="upload-preview-wrapper">
        <button
          class="upload-preview-close"
          @mouseenter="closeHover = true"
          @mouseleave="closeHover = false"
          @click="setHasUpload(false)"
        >
          <img
            v-show="!closeHover"
            src="@/assets/images/icon/ic_close.svg"
            alt="close"
          />
          <img
            v-show="closeHover"
            src="@/assets/images/icon/ic_close_h.svg"
            alt="close-hover"
          />
        </button>
        <canvas
          id="upload-preview-canvas"
          class="upload-preview-canvas"
          width="240"
          style="bottom: 50px"
        >
        </canvas>
      </div>
      <h5 class="upload-preview-name">{{ fileName }}</h5>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import { pdfHelper } from '../../utils/pdfHelper'

export default {
  name: 'SignUpload',
  data() {
    return {
      fileName: '',
      closeHover: false,
      lgWidth: 240,
      smWidth: 140,
    }
  },
  methods: {
    fileUploadClick() {
      this.$refs.fileUpload.click()
    },
    async onUploadFileChange(e) {
      if (e.target.files[0] === undefined) {
        return
      }
      const canvas = new fabric.Canvas('upload-preview-canvas')
      canvas.requestRenderAll()
      let canvasWidth =
        document.documentElement.clientWidth > 567 ? this.lgWidth : this.smWidth
      const pdfData = await pdfHelper.printPDF(e.target.files[0], canvasWidth)
      const pdfImage = await pdfHelper.pdfToImage(pdfData)

      // 透過比例設定 canvas 尺寸
      canvas.setWidth(pdfImage.width)
      canvas.setHeight(pdfImage.height)

      // 將 PDF 畫面設定為背景
      canvas.setBackgroundImage(pdfImage, canvas.renderAll.bind(canvas))
      this.fileName = e.target.files[0].name
      this.$store.commit('setUploadFile', { value: e.target.files[0] })
      this.setHasUpload(true)
    },
    setHasUpload(isUpload) {
      if (!isUpload) {
        this.$store.commit('setUploadFile', { value: undefined })
      }
      this.$store.commit('setHasUpload', isUpload)
    },
  },
  computed: {
    ...mapState(['hasUpload']),
  },
}
</script>

<style lang="scss" scoped>
.sign-upload {
  position: relative;
  height: 100%;
  &-bg {
    pointer-events: none;
    position: absolute;
    padding: 40px 30px 0px 30px;
    width: 100%;
    height: 100%;
    div {
      position: relative;
      height: 100%;
      svg {
        border-radius: 20px;
        rect {
          stroke: var(--secondary-default);
        }
      }
    }
  }
}

.upload {
  &-action {
    height: 100%;
    padding: 40px 30px 0px 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    &-btn {
      width: 131px;
      height: 41px;
      margin-top: 28px;
      margin-bottom: 32px;
      padding: 8px 28px;
      background: var(--secondary-default);
      border: 2px solid var(--primary-default);
      border-radius: 50px;
      color: var(--primary-default);
      line-height: 100%;
      &:hover {
        background: var(--primary-default);
        color: var(--secondary-default);
      }
    }
    &-title,
    &-info {
      color: var(--gray-40);
      margin-bottom: 12px;
    }
  }
  &-preview {
    height: 100%;
    &-wrapper {
      position: absolute;
      bottom: 50%;
      left: calc(50%);
      transform: translate(-50%, 50%);
    }
    &-close {
      position: absolute;
      top: -34px;
      right: -34px;
      z-index: 5;
    }
    &-canvas {
      background: #ffffff;
      border: 2px solid var(--gray-30);
    }

    &-name {
      width: 100%;
      text-align: center;
      overflow-wrap: break-word;
      position: absolute;
      // top: 455px;
      bottom: 5px;
    }
  }
}

@media screen and (max-width: 576px) {
  .sign-upload {
    &-bg {
      padding: 20px;
    }
  }

  .upload {
    &-action {
      padding: 20px;
    }
    &-preview {
      &-wrapper {
        position: absolute;
      }
      &-name {
        bottom: 30px;
      }
    }
  }
}
</style>
