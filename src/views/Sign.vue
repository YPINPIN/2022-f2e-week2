<template>
  <section class="sign">
    <div class="sign-bg">
      <div class="sign-top">
        <router-link
          @click="previous"
          :to="{ name: stepName[previousStep] }"
          :class="['sign-step-btn', { disabled: step === previousStep }]"
        >
          上一步
        </router-link>
        <h3 class="sign-top-title">{{ title[step] }}</h3>
        <router-link
          @click="next"
          :to="{ name: stepName[nextStep] }"
          :class="['sign-step-btn', { disabled: step === nextStep }]"
        >
          下一步
        </router-link>
      </div>
      <div class="sign-divider"></div>

      <div class="sign-body">
        <div>Sign</div>
        <input type="number" min="1" max="3" step="1" v-model="step" />
        <div>step : {{ step }}</div>
        <div>
          previousStep : {{ previousStep }} , {{ stepName[previousStep] }}
        </div>
        <div>nextStep : {{ nextStep }} , {{ stepName[nextStep] }}</div>
        <router-view></router-view>
      </div>

      <div class="sign-bottom">
        <router-link
          @click="previous"
          :to="{ name: stepName[previousStep] }"
          :class="['sign-step-btn', { disabled: step === previousStep }]"
        >
          上一步
        </router-link>
        <router-link
          @click="next"
          :to="{ name: stepName[nextStep] }"
          :class="['sign-step-btn', { disabled: step === nextStep }]"
          v-show="step !== nextStep"
        >
          下一步
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Sign',
  data() {
    return {
      // 設定step = 1
      step: 1,
      maxStep: 3,
      stepName: ['Content', 'SignUpload', 'SignEdit', 'SignDone'],
      title: ['', '上傳檔案', '簽署文件', '簽署完成'],
    }
  },
  methods: {
    previous() {
      console.log('previous')
      this.step = this.step - 1 < 0 ? 0 : this.step - 1
    },
    next() {
      console.log('next')
      this.step = this.step + 1 > this.maxStep ? this.maxStep : this.step + 1
    },
  },
  computed: {
    previousStep() {
      return this.step - 1 < 0 ? 0 : this.step - 1
    },
    nextStep() {
      return this.step + 1 > this.maxStep ? this.maxStep : this.step + 1
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
.sign-step-btn.disabled {
  opacity: 0;
  pointer-events: none;
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
        flex: 1;
        max-width: 50%;
        text-align: center;
      }
    }
  }
}
</style>
