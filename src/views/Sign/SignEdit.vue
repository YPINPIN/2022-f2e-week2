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
            <div class="sign-list-wrapper">
              <template v-for="(signFile, index) in signFiles" :key="index">
                <div class="sign-list-item">
                  <img
                    @click="onSignFileClick"
                    class="sign"
                    width="240"
                    height="100"
                    :src="`${signFile}`"
                  />
                </div>
              </template>
            </div>
            <button class="sign-add-btn" @click.stop.prevent="openNewSign">
              <img src="@/assets/images/button/ic_add_dark.svg" alt="btn-add" />
            </button>
          </div>
          <div v-else class="sign-add">
            <button class="sign-add-btn" @click.stop.prevent="openNewSign">
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
    ...mapState(['uploadFile', 'signFiles']),
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
      if (this.uploadFile === undefined) {
        return
      }
      const renderCanvas = new fabric.Canvas('preview-canvas')
      document.querySelector('#preview-canvas').fabric = renderCanvas
      renderCanvas.requestRenderAll()

      let canvasWidth = document.querySelector('.preview-canvas').width
      const pdfData = await pdfHelper.printPDF(this.uploadFile, canvasWidth)
      const pdfImage = await pdfHelper.pdfToImage(pdfData)

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
      let canvas = document.querySelector('#preview-canvas').fabric

      fabric.Image.fromURL(src, function (image) {
        // 設定簽名出現的位置及大小，後續可調整
        image.top = 0
        image.scaleX = 0.3
        image.scaleY = 0.3
        canvas.add(image)
      })
      // 設定編輯過檔案
      this.setHasEdit(true)
    },
    setHasEdit(isEdit) {
      this.$store.commit('setHasEdit', isEdit)
    },
    openNewSign() {
      // 開啟Modal
      this.$store.dispatch('isNewSignModalOpen', true)
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
    height: 100%;
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
      height: calc(100% - 65px);
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
    &-list {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      &-wrapper {
        height: calc(100% - 100px);
        overflow: overlay;
        padding: 20px 2px;
      }
      &-item {
        transform: scale(0.9);
        background: white;
        border-radius: 20px;
        &:hover {
          background: rgba(183, 236, 93, 0.7);
        }
      }
      .sign-add {
        &-btn {
          height: 100px;
          transition: transform 0.2s ease-in-out;
          img {
            width: 60px;
            height: 60px;
          }
        }
        &-btn:hover {
          transform: scale(0.9);
        }
      }
    }
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
    overflow: auto;
  }
  .edit {
    &-left {
      border: none;
    }
    &-right {
      width: 100%;
      height: 70%;
      .preview {
        &-wrapper {
          height: 100%;
        }
      }
    }
  }
}
</style>
