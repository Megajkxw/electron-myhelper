import { createStore } from 'vuex'

export default createStore({
  state(){
    return{
      task:{
        id:undefined,
        title:undefined,
        content:undefined,
        createTime:undefined,
        updateTime:undefined
      },
      userName:'',
      userPwd:'',
      loginWin:null,
      isLoginWin:false,
      mainWin:null
    }
  },
  mutations: {
    toLoginWin(state){
      state.isLoginWin=true
    },
    toMainWin(state){
      state.isLoginWin=false
    },
    setCurrentTask(state,task){
      state.task=task
    }
  },
  actions: {
  },
  modules: {
  }
})
