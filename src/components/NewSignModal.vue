<template>
  <transition class="modal" name="modal">
    <div class="modal-mask">
      <div class="modal-container" @click.stop="">
        <!-- header -->
        <div class="modal-header">
          <h5>建立簽名檔</h5>
        </div>
        <!-- body -->
        <div class="modal-body">
          <div class="sign-action">
            <button
              @click="setPenColor('black')"
              @mouseenter="blackHover = true"
              @mouseleave="blackHover = false"
              class="sign-action-black"
            >
              <img
                v-show="!blackHover"
                src="../assets/images/icon/ic_color_black.svg"
                alt="black"
              />
              <img
                v-show="blackHover"
                src="../assets/images/icon/ic_color_black_h.svg"
                alt="black-hover"
              />
            </button>
            <button
              @click="setPenColor('blue')"
              @mouseenter="blueHover = true"
              @mouseleave="blueHover = false"
              class="sign-action-blue"
            >
              <img
                v-show="!blueHover"
                src="../assets/images/icon/ic_color_blue.svg"
                alt="blue"
              />
              <img
                v-show="blueHover"
                src="../assets/images/icon/ic_color_blue_h.svg"
                alt="blue-hover"
              />
            </button>
            <button
              @click="setPenColor('red')"
              @mouseenter="redHover = true"
              @mouseleave="redHover = false"
              class="sign-action-red"
            >
              <img
                v-show="!redHover"
                src="../assets/images/icon/ic_color_red.svg"
                alt="red"
              />
              <img
                v-show="redHover"
                src="../assets/images/icon/ic_color_red_h.svg"
                alt="red-hover"
              />
            </button>
            <button
              @click="reset"
              @mouseenter="clearHover = true"
              @mouseleave="clearHover = false"
              class="sign-action-clear"
            >
              <img
                v-show="!clearHover"
                src="../assets/images/icon/ic_trash.svg"
                alt="clear"
              />
              <img
                v-show="clearHover"
                src="../assets/images/icon/ic_trash_h.svg"
                alt="clear-hover"
              />
            </button>
          </div>
          <div class="sign-wrapper">
            <canvas
              ref="signCanvas"
              id="sign-canvas"
              width="660"
              height="270"
            ></canvas>
          </div>

          <div class="btn-group">
            <button class="close" @click="handleClose">取消</button>
            <button class="save" @click="saveImage">確定</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'NewSignModal',
  data() {
    return {
      // 設置狀態來確認滑鼠 / 手指是否按下或在畫布範圍中
      isPainting: false,
      canvas: null,
      ctx: null,
      blackHover: false,
      blueHover: false,
      redHover: false,
      clearHover: false,
    }
  },
  mounted() {
    this.canvas = this.$refs.signCanvas
    this.ctx = this.canvas.getContext('2d')

    // 設定線條的相關數值
    this.ctx.lineWidth = 4
    this.ctx.lineCap = 'round'

    // event listener 電腦板
    this.canvas.addEventListener('mousedown', this.startPosition)
    this.canvas.addEventListener('mouseup', this.finishedPosition)
    this.canvas.addEventListener('mouseleave', this.finishedPosition)
    this.canvas.addEventListener('mousemove', this.draw)

    // event listener 手機板
    this.canvas.addEventListener('touchstart', this.startPosition)
    this.canvas.addEventListener('touchend', this.finishedPosition)
    this.canvas.addEventListener('touchcancel', this.finishedPosition)
    this.canvas.addEventListener('touchmove', this.draw)
  },
  methods: {
    handleClose() {
      this.reset()
      this.$emit('close')
    },
    // 設定顏色
    setPenColor(color) {
      switch (color) {
        case 'blue':
          this.ctx.strokeStyle = '#0066ff'
          break
        case 'red':
          this.ctx.strokeStyle = '#f93819'
          break
        case 'black':
        default:
          this.ctx.strokeStyle = '#000000'
          break
      }
    },
    // 取得滑鼠 / 手指在畫布上的位置
    getPaintPosition(e) {
      const canvasSize = this.canvas.getBoundingClientRect()

      if (e.type === 'mousemove') {
        return {
          x: e.clientX - canvasSize.left,
          y: e.clientY - canvasSize.top,
        }
      } else {
        return {
          x: e.touches[0].clientX - canvasSize.left,
          y: e.touches[0].clientY - canvasSize.top,
        }
      }
    },
    // 開始繪圖時，將狀態開啟
    startPosition(e) {
      e.preventDefault()
      this.isPainting = true
    },
    // 結束繪圖時，將狀態關閉，並產生新路徑
    finishedPosition() {
      this.isPainting = false
      this.ctx.beginPath()
    },
    // 繪圖過程
    draw(e) {
      // 滑鼠移動過程中，若非繪圖狀態，則跳出
      if (!this.isPainting) return

      // 取得滑鼠 / 手指在畫布上的 x, y 軸位置位置
      const paintPosition = this.getPaintPosition(e)

      // 移動滑鼠位置並產生圖案
      this.ctx.lineTo(paintPosition.x, paintPosition.y)
      this.ctx.stroke()
    },
    // 重新設定畫布
    reset() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    },
    // 儲存簽名
    saveImage() {
      // 圖片儲存的類型選擇 png ，並將值放入 img 的 src
      const newImg = this.canvas.toDataURL('image/png')
      // 存到vuex
      this.$store.commit('addSignFiles', { value: newImg })
      this.handleClose()
    },
  },
}
</script>

<style lang="scss" scoped>
.modal-enter,
.modal-leave-active {
  opacity: 0;
}
.modal-enter .modal-container,
.modal-leave-active .modal-container {
  transform: scale(1.2);
}

.modal {
  &-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(34, 34, 34, 0.5);
    transition: opacity 0.2s ease;
  }
  &-container {
    width: 85vw;
    max-width: 725px;
    background-color: white;
    border-radius: 14px;
    transition: all 0.2s ease;
    padding: 15px;
  }
  &-header {
    text-align: center;
    height: 50px;
    border-bottom: 2px solid var(--primary-default);
  }
  &-body {
    padding: 15px;
    text-align: center;
    .sign {
      &-wrapper {
        background: var(--secondary-tint);
        border: 2px solid var(--gray-30);
        border-radius: 20px;
      }
    }
  }
}

.btn-group {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  .close,
  .save {
    flex: 1;
    max-width: 205px;
    height: 40px;
    border-radius: 50px;
  }
  .close {
    background: white;
    border: 2px solid var(--gray-50);
    color: var(--gray-50);
    &:hover {
      background: var(--gray-50);
      color: var(--success-default);
    }
  }
  .save {
    background: var(--secondary-default);
    border: 2px solid var(--primary-default);
    color: var(--primary-default);
    &:hover {
      background: var(--primary-default);
      color: var(--secondary-default);
    }
  }
}
</style>
