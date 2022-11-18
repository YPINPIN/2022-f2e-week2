import { createStore } from 'vuex'

export default createStore({
  state: {
    // 執行階段 {0:首頁, 1:上傳檔案, 2:簽署文件, 3:簽署完成 }
    step: 0,
    // 最大步驟
    maxStep: 3,
    // 完成上傳
    hasUpload: false,
    // 完成編輯
    hasEdit: false
  },
  getters: {
    previousStep(state) {
      return state.step - 1 < 0 ? 0 : state.step - 1
    },
    nextStep(state) {
      return state.step + 1 > state.maxStep ? state.maxStep : state.step + 1
    },
  },
  mutations: {
    // 進入首頁，初始化步驟狀態
    initStep(state) {
      console.log('initStep')
      state.step = 0;
      state.hasUpload = false;
      state.hasEdit = false;
    },
    // 設定當前步驟
    setStep(state, curStep) {
      console.log('setStep : ', curStep)
      state.step = curStep;
    }
  },
  actions: {},
  modules: {}
})