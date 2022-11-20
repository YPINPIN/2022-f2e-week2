<template>
  <section class="sign">
    <div class="sign-bg">
      <div class="sign-top">
        <router-link
          :to="{ name: stepName[previousStep] }"
          :class="['sign-step-btn prev', { 'not-show': step === previousStep }]"
        >
          <svg
            class="prev-arrow"
            width="54"
            height="19"
            viewBox="0 0 54 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M52 10.75C52.6904 10.75 53.25 10.1904 53.25 9.5C53.25 8.80964 52.6904 8.25 52 8.25L52 10.75ZM1.11612 8.61612C0.627964 9.10428 0.627964 9.89573 1.11612 10.3839L9.07107 18.3388C9.55923 18.827 10.3507 18.827 10.8388 18.3388C11.327 17.8507 11.327 17.0592 10.8388 16.5711L3.76777 9.5L10.8388 2.42894C11.327 1.94078 11.327 1.14932 10.8388 0.661169C10.3507 0.173014 9.55923 0.173014 9.07107 0.661169L1.11612 8.61612ZM52 8.25L2 8.25L2 10.75L52 10.75L52 8.25Z"
              fill="#4D4D4D"
            />
          </svg>
          <span class="highlight">上一步</span>
        </router-link>
        <h3 class="sign-top-title">{{ title[step] }}</h3>
        <router-link
          v-if="step !== 2"
          :to="{ name: stepName[nextStep] }"
          :class="[
            'sign-step-btn next',
            { 'not-show': step === nextStep, disabled: isNextBtnDisabled },
          ]"
        >
          <span class="highlight">下一步</span>
          <svg
            class="next-arrow"
            width="54"
            height="19"
            viewBox="0 0 54 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M52 10.75C52.6904 10.75 53.25 10.1904 53.25 9.5C53.25 8.80964 52.6904 8.25 52 8.25L52 10.75ZM1.11612 8.61612C0.627964 9.10428 0.627964 9.89573 1.11612 10.3839L9.07107 18.3388C9.55923 18.827 10.3507 18.827 10.8388 18.3388C11.327 17.8507 11.327 17.0592 10.8388 16.5711L3.76777 9.5L10.8388 2.42894C11.327 1.94078 11.327 1.14932 10.8388 0.661169C10.3507 0.173014 9.55923 0.173014 9.07107 0.661169L1.11612 8.61612ZM52 8.25L2 8.25L2 10.75L52 10.75L52 8.25Z"
              fill="#4D4D4D"
            />
          </svg>
        </router-link>
        <button
          v-else
          :class="[
            'sign-step-btn next',
            { 'not-show': step === nextStep, disabled: isNextBtnDisabled },
          ]"
          @click.prevent="fileDoneClick"
        >
          <span class="highlight">下一步</span>
          <svg
            class="next-arrow"
            width="54"
            height="19"
            viewBox="0 0 54 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M52 10.75C52.6904 10.75 53.25 10.1904 53.25 9.5C53.25 8.80964 52.6904 8.25 52 8.25L52 10.75ZM1.11612 8.61612C0.627964 9.10428 0.627964 9.89573 1.11612 10.3839L9.07107 18.3388C9.55923 18.827 10.3507 18.827 10.8388 18.3388C11.327 17.8507 11.327 17.0592 10.8388 16.5711L3.76777 9.5L10.8388 2.42894C11.327 1.94078 11.327 1.14932 10.8388 0.661169C10.3507 0.173014 9.55923 0.173014 9.07107 0.661169L1.11612 8.61612ZM52 8.25L2 8.25L2 10.75L52 10.75L52 8.25Z"
              fill="#4D4D4D"
            />
          </svg>
        </button>
      </div>
      <div class="sign-divider"></div>

      <div class="sign-body">
        <router-view></router-view>
      </div>

      <div class="sign-bottom">
        <router-link
          :to="{ name: stepName[previousStep] }"
          :class="['sign-step-btn prev', { 'not-show': step === previousStep }]"
        >
          <svg
            class="prev-arrow"
            width="36"
            height="20"
            viewBox="0 0 36 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M34 11.25C34.6904 11.25 35.25 10.6904 35.25 10C35.25 9.30964 34.6904 8.75 34 8.75L34 11.25ZM1.11612 9.11612C0.627964 9.60427 0.627964 10.3957 1.11612 10.8839L9.07107 18.8388C9.55923 19.327 10.3507 19.327 10.8388 18.8388C11.327 18.3507 11.327 17.5592 10.8388 17.0711L3.76777 10L10.8388 2.92893C11.327 2.44078 11.327 1.64932 10.8388 1.16117C10.3507 0.673012 9.55922 0.673012 9.07107 1.16117L1.11612 9.11612ZM34 8.75L2 8.75L2 11.25L34 11.25L34 8.75Z"
              fill="#4D4D4D"
            />
          </svg>
          <span class="highlight">上一步</span>
        </router-link>
        <router-link
          v-if="step !== 2"
          :to="{ name: stepName[nextStep] }"
          :class="[
            'sign-step-btn next',
            { 'not-show': step === nextStep, disabled: isNextBtnDisabled },
          ]"
          v-show="step !== nextStep"
        >
          <span class="highlight">下一步</span>
          <svg
            class="next-arrow"
            width="36"
            height="20"
            viewBox="0 0 36 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M34 11.25C34.6904 11.25 35.25 10.6904 35.25 10C35.25 9.30964 34.6904 8.75 34 8.75L34 11.25ZM1.11612 9.11612C0.627964 9.60427 0.627964 10.3957 1.11612 10.8839L9.07107 18.8388C9.55923 19.327 10.3507 19.327 10.8388 18.8388C11.327 18.3507 11.327 17.5592 10.8388 17.0711L3.76777 10L10.8388 2.92893C11.327 2.44078 11.327 1.64932 10.8388 1.16117C10.3507 0.673012 9.55922 0.673012 9.07107 1.16117L1.11612 9.11612ZM34 8.75L2 8.75L2 11.25L34 11.25L34 8.75Z"
              fill="#4D4D4D"
            />
          </svg>
        </router-link>
        <button
          v-else
          :class="[
            'sign-step-btn next',
            { 'not-show': step === nextStep, disabled: isNextBtnDisabled },
          ]"
          @click.prevent="fileDoneClick"
        >
          <span class="highlight">下一步</span>
          <svg
            class="next-arrow"
            width="54"
            height="19"
            viewBox="0 0 54 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M52 10.75C52.6904 10.75 53.25 10.1904 53.25 9.5C53.25 8.80964 52.6904 8.25 52 8.25L52 10.75ZM1.11612 8.61612C0.627964 9.10428 0.627964 9.89573 1.11612 10.3839L9.07107 18.3388C9.55923 18.827 10.3507 18.827 10.8388 18.3388C11.327 17.8507 11.327 17.0592 10.8388 16.5711L3.76777 9.5L10.8388 2.42894C11.327 1.94078 11.327 1.14932 10.8388 0.661169C10.3507 0.173014 9.55923 0.173014 9.07107 0.661169L1.11612 8.61612ZM52 8.25L2 8.25L2 10.75L52 10.75L52 8.25Z"
              fill="#4D4D4D"
            />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Sign',
  data() {
    return {
      stepName: ['Content', 'SignUpload', 'SignEdit', 'SignDone'],
      title: ['', '上傳檔案', '簽署文件', '簽署完成'],
    }
  },
  computed: {
    ...mapState(['step', 'maxStep', 'hasUpload', 'hasEdit']),
    ...mapGetters(['previousStep', 'nextStep']),
    // 檢查對應步驟是否完成
    isNextBtnDisabled() {
      let isDisabled = false
      switch (this.$route.name) {
        case 'SignUpload':
          isDisabled = !this.hasUpload
          break
        case 'SignEdit':
          isDisabled = !this.hasEdit
          break
        default:
          break
      }
      return isDisabled
    },
  },
  methods: {
    // 編輯完成先儲存圖片
    fileDoneClick() {
      console.log('fileDoneClick')
      let canvas = document.querySelector('#preview-canvas').fabric
      console.log(canvas)
      // 將 canvas 存為圖片
      const image = canvas.toDataURL('image/png')
      if (image) {
        this.$store.commit('setEditFileImage', { value: image })
        this.$router.push({ name: 'SignDone' })
      } else {
        console.log('fileDoneClick error')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.sign {
  position: relative;
  margin: 0 auto;
  width: 75%;
  max-width: 1420px;
  height: 100vh;
  padding: 40px 0 80px;
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
  &-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-title {
      color: var(--secondary-default);
    }
  }
  &-divider {
    width: 100%;
    height: 2px;
    background-color: var(--primary-default);
    margin-top: 1rem;
  }
  &-body {
    height: 100%;
  }
  &-bottom {
    display: none;
  }
}

.sign-step-btn {
  display: flex;
  align-items: center;
  height: 41px;
  padding: 8px 28px;
  gap: 10px;
  &.next {
    background: var(--secondary-default);
    border: 2px solid var(--primary-default);
    border-radius: 50px;
    svg {
      path {
        fill: var(--primary-default);
      }
    }
    span {
      color: var(--primary-default);
    }
    &:hover {
      background: var(--primary-default);
      svg {
        path {
          fill: var(--secondary-default);
        }
      }
      span {
        color: var(--secondary-default);
      }
    }
  }
  &.prev {
    svg {
      path {
        fill: var(--secondary-default);
      }
    }
    span {
      color: var(--secondary-default);
    }
    &:hover {
      svg {
        path {
          fill: var(--primary-default);
        }
      }
      span {
        color: var(--primary-default);
      }
    }
  }

  .next-arrow {
    rotate: (180deg);
  }
  &.disabled {
    background: var(--gray-20);
    border: 2px solid var(--gray-30);
    svg {
      path {
        fill: var(--gray-50);
      }
    }
    span {
      color: var(--gray-50);
    }
    pointer-events: none;
  }
  &.not-show {
    opacity: 0;
    pointer-events: none;
  }
}
@media screen and (max-width: 768px) {
  .sign-step-btn {
    height: 41px;
    padding: 8px 4px;
    gap: 0px;
  }
}

@media screen and (max-width: 576px) {
  .sign {
    padding: 48px 0px 18px;
    width: 95%;
    &-bg {
      padding: 12px;
      border-radius: 20px;
    }
    &-top {
      justify-content: center;
      .sign-step-btn {
        display: none;
      }
    }
    &-divider {
      margin-top: 4px;
    }
    &-bottom {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      .sign-step-btn {
        justify-content: center;
        flex: 1;
        max-width: 50%;
        height: 38px;
        text-align: center;
        gap: 10px;
        svg {
          max-width: 32px;
        }
      }
    }
  }
}
</style>
