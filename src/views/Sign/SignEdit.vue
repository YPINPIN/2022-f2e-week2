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
          <div v-if="signFiles.length > 0" class="sign-list">
            <template v-for="(signFile, index) in signFiles" :key="index">
              <img
                @click="onSignFileClick"
                class="sign"
                style="border: 1px solid #000"
                width="250"
                height="150"
                :src="`${signFile}`"
              />
            </template>
            <button class="sign-add-btn">
              <img src="@/assets/images/button/ic_add_dark.svg" alt="btn-add" />
            </button>
          </div>
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
          <canvas id="preview-canvas" class="preview-canvas"> </canvas>
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
      signFiles: [
        'data:image/png;base64,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',
      ],
      tabs: ['sign', 'pic', 'text', 'page'],
      tabsInfo: ['簽名', '圖片', '文字', '頁數'],
      tabsHover: [false, false, false, false],
      deleteIcon:
        "data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='10.75' stroke='%234D4D4D' stroke-width='2.5'/%3E%3Cpath d='M16 24L23.7782 16.2218' stroke='%234D4D4D' stroke-width='2.5' stroke-linecap='round'/%3E%3Cpath d='M24 24L16.2218 16.2218' stroke='%234D4D4D' stroke-width='2.5' stroke-linecap='round'/%3E%3C/svg%3E",
      img: null,
      cornerSize: 24,
    }
  },
  mounted() {
    let canvas = document.querySelector('.preview-canvas')
    this.fitToContainer(canvas)
    this.uploadFilePreview()
    this.setFabric()
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
      const renderCanvas = new fabric.Canvas('preview-canvas')
      document.querySelector('#preview-canvas').fabric = renderCanvas
      renderCanvas.requestRenderAll()
      console.log('uploadFile : ', this.uploadFile)
      console.log(document.documentElement.clientWidth)
      let canvasWidth = document.querySelector('.preview-canvas').width
      console.log('canvasWidth : ', canvasWidth)
      const pdfData = await pdfHelper.printPDF(this.uploadFile, canvasWidth)

      console.log(pdfData)
      const pdfImage = await pdfHelper.pdfToImage(pdfData)
      console.log(pdfImage)

      // 透過比例設定 canvas 尺寸
      renderCanvas.setWidth(pdfImage.width)
      renderCanvas.setHeight(pdfImage.height)

      // 將 PDF 畫面設定為背景
      renderCanvas.setBackgroundImage(
        pdfImage,
        renderCanvas.renderAll.bind(renderCanvas)
      )
    },
    onSignFileClick(e) {
      if (!e.target.src) return
      let src = e.target.src
      console.log(src)
      let canvas = document.querySelector('#preview-canvas').fabric
      console.log(canvas)

      fabric.Image.fromURL(src, function (image) {
        // 設定簽名出現的位置及大小，後續可調整
        image.top = 0
        image.scaleX = 0.5
        image.scaleY = 0.5
        canvas.add(image)
      })
      // 設定編輯過檔案
      this.setHasEdit(true)
    },
    setHasEdit(isEdit) {
      this.$store.commit('setHasEdit', isEdit)
    },

    // 客製化Fabric控制元件
    setFabric() {
      this.img = document.createElement('img')
      this.img.src = this.deleteIcon
      // fabric.Object.prototype.transparentCorners = false
      // fabric.Object.prototype.cornerColor = 'blue'
      // fabric.Object.prototype.cornerStyle = 'circle'
      fabric.Object.prototype.controls.deleteControl = new fabric.Control({
        x: -0.5,
        y: -0.5,
        offsetX: -15,
        offsetY: -15,
        cursorStyle: 'pointer',
        mouseUpHandler: this.deleteObject,
        render: this.renderIcon,
        cornerSize: this.cornerSize,
      })
    },
    deleteObject(eventData, transform) {
      let target = transform.target
      let canvas = target.canvas
      canvas.remove(target)
      canvas.requestRenderAll()
    },
    renderIcon(ctx, left, top, styleOverride, fabricObject) {
      let size = this.cornerSize
      ctx.save()
      ctx.translate(left, top)
      ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle))
      ctx.drawImage(this.img, -size / 2, -size / 2, size, size)
      ctx.restore()
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
