import { createStore } from 'vuex'

export default createStore({
  state: {
    userName:'',
    userPwd:'',
    loginWin:null,
    isLoginWin:false,
    mainWin:null
  },
  mutations: {
    toLoginWin(state){
      state.isLoginWin=true
    },
    toMainWin(state){
      state.isLoginWin=false
    }
  },
  actions: {
  },
  modules: {
  }
})
