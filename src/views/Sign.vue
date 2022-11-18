<template>
  <section class="sign">
    <div class="sign-bg">
      <div class="sign-top">
        <router-link
          :to="{ name: stepName[previousStep] }"
          :class="['sign-step-btn', { 'not-show': step === previousStep }]"
        >
          上一步
        </router-link>
        <h3 class="sign-top-title">{{ title[step] }}</h3>
        <router-link
          :to="{ name: stepName[nextStep] }"
          :class="[
            'sign-step-btn',
            { 'not-show': step === nextStep, disabled: isNextBtnDisabled },
          ]"
        >
          下一步
        </router-link>
      </div>
      <div class="sign-divider"></div>

      <div class="sign-body">
        <div>Sign</div>
        <div>step : {{ step }}</div>
        <div>
          previousStep : {{ previousStep }} , {{ stepName[previousStep] }}
        </div>
        <div>nextStep : {{ nextStep }} , {{ stepName[nextStep] }}</div>
        <router-view></router-view>
      </div>

      <div class="sign-bottom">
        <router-link
          :to="{ name: stepName[previousStep] }"
          :class="['sign-step-btn', { 'not-show': step === previousStep }]"
        >
          上一步
        </router-link>
        <router-link
          :to="{ name: stepName[nextStep] }"
          :class="[
            'sign-step-btn',
            { 'not-show': step === nextStep, disabled: isNextBtnDisabled },
          ]"
          v-show="step !== nextStep"
        >
          下一步
        </router-link>
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
  color: var(--gray-50);
  pointer-events: none;
}
.sign-step-btn.not-show {
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
