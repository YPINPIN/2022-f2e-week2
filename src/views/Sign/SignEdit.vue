<template>
  <section class="sign-edit">
    <section class="edit-left">
      <div class="edit-left-tabs">
        <template v-for="(tab, index) in tabs" :key="index">
          <div :class="['tabs-item', `tabs-${tab}`]">
            <button
              :class="[`tabs-${tab}-btn`]"
              @mouseenter="tabsHover[index] = true"
              @mouseleave="tabsHover[index] = false"
            >
              <img
                v-show="!tabsHover[index]"
                :src="getImageUrl(`images/icon/ic_${tab}.svg`)"
                :alt="[`btn-${tab}`]"
              />
              <img
                v-show="tabsHover[index]"
                :src="getImageUrl(`images/icon/ic_${tab}_h.svg`)"
                :alt="[`btn-${tab}-hover`]"
              />
            </button>
            <p>{{ tabsInfo[index] }}</p>
          </div>
        </template>
      </div>
      <div class="edit-left-body">
        <div class="sign-block">
          <div v-if="signFile.length > 0" class="sign-list">list</div>
          <div v-else class="sign-add">
            <button class="sign-add-btn">
              <img src="@/assets/images/button/ic_add_dark.svg" alt="btn-add" />
            </button>
            <h5 class="sign-add-text">新增簽名檔</h5>
          </div>
        </div>
      </div>
    </section>
    <section class="edit-right">
      <div class="edit-right-preview">
        <div class="preview-wrapper">
          <canvas
            id="preview-canvas"
            class="preview-canvas"
            style="top: 40px; border: 2px solid blue"
          >
          </canvas>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import { pdfHelper } from '../../utils/pdfHelper'
export default {
  name: 'SignEdit',
  data() {
    return {
      signFile: [],
      tabs: ['sign', 'pic', 'text', 'page'],
      tabsInfo: ['簽名', '圖片', '文字', '頁數'],
      tabsHover: [false, false, false, false],
    }
  },
  mounted() {
    let canvas = document.querySelector('.preview-canvas')
    this.fitToContainer(canvas)
    this.uploadFilePreview()
  },
  computed: {
    ...mapState(['uploadFile']),
  },
  methods: {
    getImageUrl(imagePath) {
      return new URL(`/src/assets/${imagePath}`, import.meta.url).href
    },
    fitToContainer(canvas) {
      // Make it visually fill the positioned parent
      canvas.style.width = '100%'
      canvas.style.height = '100%'
      // ...then set the internal size to match
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      // console.log(canvas.offsetWidth)
      // console.log(canvas.offsetHeight)
    },
    async uploadFilePreview() {
      console.log('uploadFile : ', this.uploadFile)
      if (this.uploadFile === undefined) {
        return
      }
      const canvas = new fabric.Canvas('preview-canvas')
      canvas.requestRenderAll()
      console.log('uploadFile : ', this.uploadFile)
      console.log(document.documentElement.clientWidth)
      let canvasWidth = document.querySelector('.preview-canvas').width
      console.log('canvasWidth : ', canvasWidth)
      const pdfData = await pdfHelper.printPDF(this.uploadFile, canvasWidth)

      console.log(pdfData)
      const pdfImage = await pdfHelper.pdfToImage(pdfData)
      console.log(pdfImage)

      // 透過比例設定 canvas 尺寸
      canvas.setWidth(pdfImage.width)
      canvas.setHeight(pdfImage.height)

      // 將 PDF 畫面設定為背景
      canvas.setBackgroundImage(pdfImage, canvas.renderAll.bind(canvas))
    },
  },
}
</script>

<style lang="scss" scoped>
.sign-edit {
  height: 92%;
  display: flex;
  border-top: 2px solid var(--primary-default);
}

.edit {
  &-left {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-right: 2px solid var(--primary-default);
    padding-top: 15px;
    &-tabs {
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .tabs-item {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }
    &-body {
      width: 100%;
      height: 100%;
      padding: 10px;
    }
  }
  &-right {
    width: 75%;
    height: 100%;
    flex: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    &-preview {
      position: relative;
      width: 77%;
      height: 95%;
      background: var(--gray-30);
      border: 2px solid var(--gray-30);
      overflow: auto;
    }
    .preview {
      &-wrapper {
        width: 100%;
        height: 714px;
        padding: 40px;
      }
    }
  }
}

.sign-block {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  background: #f5f5f5;
  border-radius: 20px;
  .sign {
    &-add {
      &-btn {
        transition: transform 0.2s ease-in-out;
        img {
          width: 80px;
          height: 80px;
        }
      }
      &-btn:hover {
        transform: scale(0.9);
      }
      &-text {
        margin-top: 16px;
        color: var(--secondary-default);
      }
    }
  }
}

@media screen and (max-width: 960px) {
  .edit {
    &-right {
      width: 65%;
    }
  }
}

@media screen and (max-width: 768px) {
  .edit {
    &-right {
      width: 50%;
    }
  }
}

@media screen and (max-width: 576px) {
  .sign-edit {
    flex-direction: column;
  }
  .edit {
    &-left {
      border: none;
      &-body {
        display: none;
      }
    }
    &-right {
      width: 100%;
      height: 70%;
    }
  }
}
</style>
